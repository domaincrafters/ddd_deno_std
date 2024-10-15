const GITHUB_API_URL = "https://github.com/domaincrafters/ddd_deno_std/releases/latest";
const DENO_JSON_PATH = "./deno.json";

async function getNewVersionFromGithub(): Promise<string> {
    const response = await fetch(GITHUB_API_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch latest release: ${response.statusText}`);
    }

    const version: string = response.url.split("/").pop() || "";
    if (!RegExp(/^v?\d+\.\d+\.\d+$/).exec(version)) {
        throw new Error(`Invalid version: ${version}`);
    }

    return version.replace(/^v/, "");
}

async function getOldVersionFromDenoJson(): Promise<string> {
    const denoFile = await Deno.readTextFile(DENO_JSON_PATH);
    const version = denoFile.match(/"version":\s*"(.*)"/)?.[1];
    if (!version) {
        throw new Error("Version not found in deno.json");
    }

    return version;
}

async function updateDenoJsonVersion(version: string): Promise<void> {
    const denoFile = await Deno.readTextFile(DENO_JSON_PATH);
    const updatedDenoJson = denoFile.replace(/"version":\s*".*"/, `"version": "${version}"`);
    await Deno.writeTextFile(DENO_JSON_PATH, updatedDenoJson);
    console.log(`Updated deno.json to version ${version}`);
}

async function updateGithubOutput(key: string, value: string): Promise<void> {
    const GITHUB_OUTPUT = Deno.env.get("GITHUB_OUTPUT");
    if (GITHUB_OUTPUT) {
        console.log(`Setting ${key} to ${value}`);
        await Deno.writeTextFile(GITHUB_OUTPUT, `${key}=${value}\n`, { append: true });
    }
}

async function main() {
    try {
        const new_version: string = await getNewVersionFromGithub();
        const old_version: string = await getOldVersionFromDenoJson();
        await updateDenoJsonVersion(new_version);

        if (new_version === '' || old_version === '') {
            console.log(`Invalid version: ${new_version} or ${old_version}`);
            // Let deno exit with error code
            Deno.exit(1);
        }

        await updateGithubOutput("new_version", new_version);
        await updateGithubOutput("old_version", old_version);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

main();