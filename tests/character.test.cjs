const assert = require("node:assert/strict");
const { test } = require("node:test");
const { buildSync } = require("esbuild");

test("character keys await clipboard success and let failed copies retry", async () => {
  let status = "idle";
  const code = buildSync({
    entryPoints: ["src/components/Character.tsx"],
    bundle: true,
    write: false,
    format: "cjs",
    platform: "node",
    jsx: "automatic",
    external: ["react", "react/jsx-runtime"],
  }).outputFiles[0].text;
  const componentModule = { exports: {} };
  new Function("require", "module", "exports", code)(
    (name) => name === "react" ? {
      useState: () => [status, (value) => { status = value; }],
      useEffect: () => {},
    } : require(name),
    componentModule,
    componentModule.exports,
  );
  const Character = componentModule.exports.default;
  const key = () => Character({ character: "é" });
  assert.equal(key().type, "button");
  assert.equal(key().props["aria-label"], "Copy é");

  const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, "navigator");
  try {
    let finishCopy;
    Object.defineProperty(globalThis, "navigator", {
      configurable: true,
      value: { clipboard: { writeText: (value) => {
        assert.equal(value, "é");
        return new Promise((resolve) => { finishCopy = resolve; });
      } } },
    });
    const pending = key().props.onClick();
    assert.equal(status, "copying");
    assert.equal(key().props.disabled, true);
    finishCopy();
    await pending;
    assert.equal(status, "copied");
    assert.equal(key().props["data-copied"], true);

    navigator.clipboard.writeText = async () => { throw new Error("Permission denied"); };
    await key().props.onClick();
    assert.equal(status, "failed");
    assert.equal(key().props.disabled, false);
    delete navigator.clipboard;
    await key().props.onClick();
    assert.equal(status, "failed");
  } finally {
    if (originalNavigator) Object.defineProperty(globalThis, "navigator", originalNavigator);
    else delete globalThis.navigator;
  }
});
