const std = @import("std");
const file_sv = @import("file_service.zig");
const htp_sv = @import("http_service.zig");

const port: u16 = 5215;
const ip = "127.0.0.1";

var gpa = std.heap.GeneralPurposeAllocator(.{}){};
var allocator = gpa.allocator();

pub fn main() !void {
    defer _ = gpa.deinit();

    const address = try std.net.Address.parseIp4("0.0.0.0", port);
    var listener = try address.listen(.{ .reuse_address = true });
    defer listener.deinit();

    const exe_dir = try file_sv.get_dir_path(&allocator);
    defer allocator.free(exe_dir);

    std.debug.print("Server started at http://{s}:{d}\n", .{ ip, port });

    while (true) {
        var conn = try listener.accept();
        defer conn.stream.close();

        _ = htp_sv.handleRequest(&allocator, conn, exe_dir) catch |err| {
            std.debug.print("Error in handling Request\n{s}", .{@errorName(err)});
        };
    }
}
