#!/usr/bin/env python3
"""Build the FoundryVTT module zip with the required cairn2e-de/ prefix.

Usage: python3 tools/build_zip.py [output-path]
Default output: releases/cairn2e-de.zip
Excludes .git, .vibe, tools/, releases/ and GitHub workflow files.
"""
import os
import sys
import zipfile

EXCLUDE_DIRS = {".git", ".vibe", "tools", "releases", ".github"}
PREFIX = "cairn2e-de/"


def collect_files():
    files = []
    for root, dirs, fs in os.walk("."):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for f in fs:
            rel = os.path.relpath(os.path.join(root, f), ".")
            files.append(rel)
    return sorted(files)


def main():
    out = sys.argv[1] if len(sys.argv) > 1 else "releases/cairn2e-de.zip"
    files = collect_files()
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        for f in files:
            z.write(f, PREFIX + f)
    print(f"{out}: {len(files)} files")


if __name__ == "__main__":
    main()
