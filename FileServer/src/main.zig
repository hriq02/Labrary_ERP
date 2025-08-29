const std = @import("std");
const zap = @import("zap");

fn on_request(r: zap.Request) !void {
    r.parseQuery();

    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();
    const cwd = std.fs.cwd();

    if (r.getParamCount() < 0) {
        return;
    }

    const file_path = r.getParamSlice("path");

    if (file_path) |path| {
        const full_path = try std.fmt.allocPrint(alloc, "Files/{s}", .{path});
        defer alloc.free(full_path);

        const file_stat = try cwd.statFile(full_path);
        const file_size = file_stat.size;
        const file_contents = try cwd.readFileAlloc(alloc, full_path, file_size);
        defer alloc.free(file_contents);

        r.sendBody(file_contents) catch return;
    }
}

pub fn main() !void {
    var listener = zap.HttpListener.init(.{
        .port = 3000,
        .on_request = on_request,
        .log = true,
    });
    try listener.listen();

    std.debug.print("Listening on 0.0.0.0:3000\n", .{});

    // start worker threads
    zap.start(.{
        .threads = 2,
        .workers = 2,
    });
}
