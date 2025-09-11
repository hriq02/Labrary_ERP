const std = @import("std");
const file_sv = @import("file_service.zig");

/// Build a full HTTP response (header + body)
pub fn buildResponse(allocator_ptr: *std.mem.Allocator, content_type: []const u8, body: []const u8) ![]u8 {
    const allocator = allocator_ptr.*;

    const body_size: usize = @intCast(body.len);
    const header = try std.fmt.allocPrint(allocator, "HTTP/1.1 200 OK\r\nContent-Length: {d}\r\nContent-Type: {s}\r\nConnection: close\r\n\r\n", .{ body_size, content_type });
    defer allocator.free(header);

    var resp = try allocator.alloc(u8, header.len + body.len);
    std.mem.copyForwards(u8, resp[0..header.len], header);
    std.mem.copyForwards(u8, resp[header.len..], body);
    return resp;
}

/// Handle one HTTP GET request
pub fn handleRequest(allocator_ptr: *std.mem.Allocator, conn: std.net.Server.Connection, exe_dir: []const u8) !void {
    const allocator = allocator_ptr.*;
    var reqbuf: [4096]u8 = undefined;
    const n = try conn.stream.read(&reqbuf);
    if (n == 0) return;
    const request = reqbuf[0..n];

    // Parse first line
    const nl_index = std.mem.indexOfScalar(u8, request, '\n') orelse request.len;
    const first_line = std.mem.trim(u8, request[0..nl_index], " \r\n\t");
    var tok_it = std.mem.tokenizeAny(u8, first_line, " ");
    const method = tok_it.next() orelse "";
    const raw_path = tok_it.next() orelse "/";

    if (!std.mem.eql(u8, method, "GET")) {
        _ = try conn.stream.write("HTTP/1.1 405 Method Not Allowed\r\nContent-Length: 0\r\nConnection: close\r\n\r\n");
        return;
    }

    const rel_path = sanitizePath(raw_path);
    if (rel_path.len == 0 or std.mem.indexOf(u8, rel_path, "..") != null) {
        _ = try conn.stream.write("HTTP/1.1 404 Not Found\r\nContent-Length: 0\r\n\r\n");
        return;
    }

    const full_path = try std.fmt.allocPrint(allocator, "{s}/Files/{s}", .{ exe_dir, rel_path });
    defer allocator.free(full_path);

    const file_buf = file_sv.readFile(allocator_ptr, full_path) catch |err| {
        std.debug.print("File not found: {s} ({s})\n", .{ full_path, @errorName(err) });
        _ = try conn.stream.write("HTTP/1.1 404 Not Found\r\nContent-Length: 0\r\n\r\n");
        return;
    };

    const mime = getMime(rel_path);
    const resp = try buildResponse(allocator_ptr, mime, file_buf);
    defer allocator.free(resp);
    defer allocator.free(file_buf);

    _ = try conn.stream.write(resp);
}

/// Sanitize the requested path (remove query string, leading slash)
pub fn sanitizePath(raw_path: []const u8) []const u8 {
    const qmark = std.mem.indexOfScalar(u8, raw_path, '?') orelse raw_path.len;
    const path_part = raw_path[0..qmark];
    if (path_part.len > 0 and path_part[0] == '/') return path_part[1..];
    return path_part;
}

/// Determine MIME type based on file extension
pub fn getMime(path: []const u8) []const u8 {
    if (std.mem.endsWith(u8, path, ".png")) return "image/png";
    if (std.mem.endsWith(u8, path, ".jpg")) return "image/jpeg";
    if (std.mem.endsWith(u8, path, ".jpeg")) return "image/jpeg";
    if (std.mem.endsWith(u8, path, ".gif")) return "image/gif";
    if (std.mem.endsWith(u8, path, ".html")) return "text/html; charset=utf-8";
    return "application/octet-stream";
}
