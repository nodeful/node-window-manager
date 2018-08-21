export const WindowStyles = {
  BORDER: 8388608,
  CAPTION: 12582912,
  POPUP: 2147483648,
  CHILD: 1073741824,
  CHILDWINDOW: 40000000,
  CLIPCHILDREN: 33554432,
  CLIPSIBLINGS: 67108864,
  DISABLED: 134217728,
  DLGFRAME: 4194304,
  GROUP: 131072,
  HSSCROLL: 1048576,
  ICONIC: 536870912,
  MAXIMIZE: 16777216,
  MAXIMIZEBOX: 65536,
  MINIMIZE: 536870912,
  MINIMIZEBOX: 131072,
  OVERLAPPED: 0,
  OVERLAPPEDWINDOW:
    this.OVERLAPPED |
    this.CAPTION |
    this.SYSMENU |
    this.THICKFRAME |
    this.MINIMIZEBOX |
    this.MAXIMIZEBOX,
  POPUPWINDOW: this.POPUP | this.BORDER | this.SYSMENU,
  SIZEBOX: 262144,
  SYSMENU: 524288,
  TABSTOP: 65536,
  THICKFRAME: 262144,
  TILED: 0,
  TILEDWINDOW: this.OVERLAPPEDWINDOW,
  VISIBLE: 268435456,
  VSCROLL: 2097152
};