const data = (await import("./data.json")).default;
export const repeats = 20;
export const slice1 = data.slice(0, 10000);
export const slice2 = data.slice(10000);

export interface DataRow {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    animal: string;
}

export const download = (
    content: string,
    fileName: string,
    contentType: string
) => {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
};

const times: number[] = [];

export const logTime = (time: number) => {
    times.push(Math.round(performance.now() - time));
};

export const downloadResults = (name = "results") => {
    const results = JSON.parse(localStorage.getItem("results") || "{}");

    const lines = Array.from({ length: 21 }, () => "");

    for (const result of results) {
        for (let i = 0; i < 21; i++) {
            lines[i] += `${result[i]};`;
        }
    }
    const content = lines.join("\n");
    download(content, `${name}.csv`, "text/csv");
};

export const saveResults = (name: string) => {
    const content = [name, ...times];
    const results = JSON.parse(localStorage.getItem("results") || "[]");
    localStorage.setItem("results", JSON.stringify([...results, content]));
};

export const resetTimes = () => {
    times.splice(0, times.length);
};

let finishCallback = () => {};

const performTestIteration = (
    initFn: () => void,
    testFn: () => void,
    counter: number
) => {
    if (counter > 0) {
        const time = performance.now();
        testFn();

        requestAnimationFrame(() => {
            setTimeout(() => {
                logTime(time);
                initFn();
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        performTestIteration(initFn, testFn, counter - 1);
                    }, 100);
                });
            });
        });
    } else {
        finishCallback();
    }
};

const skipDownload = true;
export const performTest = (
    name: string,
    initFn: () => void,
    testFn: () => void
) => {
    resetTimes();
    finishCallback = () => {
        saveResults(name);
        if (!skipDownload) {
            downloadResults(name);
        }
        alert(`Done ${name}`);
    };

    initFn();
    setTimeout(() => {
        performTestIteration(initFn, testFn, repeats);
    }, 0);
};
