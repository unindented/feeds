/**
 * Copyright 2025 Daniel Perez Alvarez
 *
 * This file is part of Static Feeds.
 *
 * Static Feeds is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * Static Feeds is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Static Feeds. If not, see <https://www.gnu.org/licenses/>.
 */

/* eslint-disable */

import sqlite3InitModule from "@sqlite.org/sqlite-wasm";

function log(level: "debug" | "info" | "warn" | "error", ...args: any[]) {
  postMessage({ type: `log-${level}`, payload: args });
}

async function start(sqlite3: any) {
  const response = await fetch("/feeds.sqlite3");
  const arrayBuffer = await response.arrayBuffer();

  const { capi, oo1: oo, version, wasm } = sqlite3;

  log("debug", "SQLite3 version", version.libVersion);

  const DbClass = "opfs" in sqlite3 ? oo.OpfsDb : oo.DB;
  const db = new DbClass();
  const p = wasm.allocFromTypedArray(arrayBuffer);
  const rc = capi.sqlite3_deserialize(
    db.pointer,
    "main",
    p,
    arrayBuffer.byteLength,
    arrayBuffer.byteLength,
    capi.SQLITE_DESERIALIZE_FREEONCLOSE,
  );
  db.checkRc(rc);

  try {
    const compileOptions = db.exec({
      sql: "PRAGMA compile_options",
      returnValue: "resultRows",
    });
    log("debug", "SQLite3 compile options", ...compileOptions.flat());
  } finally {
    db.close();
  }
}

log("debug", "initializing SQLite3 module");
const sqlite3 = await sqlite3InitModule({
  print: log.bind(null, "info"),
  printErr: log.bind(null, "error"),
});
try {
  await start(sqlite3);
} catch (err: unknown) {
  log("error", err);
}
