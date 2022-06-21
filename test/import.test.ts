describe("import vue components", () => {
    test("normal imports as expected", async() => {
        const cmp = await import("./src/components/Badge.vue");
        expect(cmp).toBeDefined();
    });

    test("template string imports as expected", async() => {
        const cmp = await import("./src/components/Badge.vue");
        expect(cmp).toBeDefined();
    });

    test("dynamic imports as expected", async() => {
        const name = "Badge";
        const cmp = await import(`./src/components/${name}.vue`);
        expect(cmp).toBeDefined();
    });
});
