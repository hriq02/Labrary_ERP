const std = @import("std");
const fs = std.fs;

/// Read file from disk into buffer
pub fn readFile(allocator_ptr: *std.mem.Allocator, full_path: []const u8) ![]u8 {
    const allocator = allocator_ptr.*;
    var file = try fs.cwd().openFile(full_path, .{});
    defer file.close();

    const stat = try file.stat();
    const file_size: usize = @intCast(stat.size);
    const buf = try allocator.alloc(u8, file_size);
    _ = try file.readAll(buf);
    return buf;
}

pub fn get_dir_path(allocator: *std.mem.Allocator) ![]const u8 {
    return fs.selfExeDirPathAlloc(allocator.*);
}
