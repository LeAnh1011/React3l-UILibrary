export function formatFileSize(bytes: number) {
    if (Math.abs(bytes) < 1024) {
        return bytes + " B";
    }

    const units = ["kB", "MB", "GB"];
    let u = -1;
    const r = 10 ** 1;

    do {
        bytes /= 1024;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= 1024 && u < units.length - 1);

    return bytes.toFixed(1) + " " + units[u];
}
