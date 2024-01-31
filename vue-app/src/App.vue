<script setup lang="ts">
import { ref } from "vue";
import {
    slice1,
    slice2,
    performTest,
    downloadResults,
    DataRow,
} from "common/utlis";

const items = ref<DataRow[]>([]);

const initAdditionTest = () => {
    performTest(
        "vue-addition",
        () => {
            items.value = [];
        },
        () => {
            items.value = slice1;
        }
    );
};

const initAppendFrontTest = () => {
    performTest(
        "vue-appendFront",
        () => {
            items.value = slice1;
        },
        () => {
            items.value = slice2.concat(items.value);
        }
    );
};

const initAppendTest = () => {
    performTest(
        "vue-append",
        () => {
            items.value = slice1;
        },
        () => {
            items.value = items.value.concat(slice2);
        }
    );
};

const initRemoveTest = (deleteCount: number) => {
    const border1 = Math.floor((items.value.length - deleteCount) / 2);
    const border2 = border1 + deleteCount;

    return performTest(
        `vue-remove${deleteCount}`,
        () => {
            items.value = slice1;
        },
        () => {
            items.value = items.value
                .slice(0, border1)
                .concat(items.value.slice(border2));
        }
    );
};

const initRemoveEveryXTest = (x: number) => {
    performTest(
        `vue-removeEvery${x}`,
        () => {
            items.value = slice1;
        },
        () => {
            items.value = items.value.filter((_, idx) => idx % x !== 0);
        }
    );
};

const initUpdateTest = () => {
    performTest(
        "vue-update",
        () => {
            items.value = slice1;
        },
        () => {
            items.value = items.value.map((item, idx) => ({
                ...item,
                first_name: slice2[idx].first_name,
            }));
        }
    );
};

const initUpdateKeepKeyTest = () => {
    performTest(
        "vue-updateKeepKey",
        () => {
            items.value = slice1;
        },
        () => {
            items.value = items.value.map((item, idx) => ({
                ...slice2[idx],
                id: item.id,
            }));
        }
    );
};

const initUpdateRowTest = () => {
    performTest(
        "vue-updateRow",
        () => {
            items.value = slice1;
        },
        () => {
            items.value = slice2;
        }
    );
};

const initReverseTest = () => {
    performTest(
        "vue-reverse",
        () => {
            items.value = slice1;
        },
        () => {
            items.value = items.value.toReversed();
        }
    );
};
</script>

<template>
    <div>
        <div>
            <button @click="() => initAdditionTest()">
                Dodaj 10 000 elementów
            </button>
            <button @click="() => initAppendTest()">
                Dodaj 10 000 elementów na koniec
            </button>
            <button @click="() => initAppendFrontTest()">
                Dodaj 10 000 elementów na początek
            </button>
            <button @click="() => initRemoveTest(1)">
                Usuń 1 element ze środka
            </button>
            <button @click="() => initRemoveTest(1000)">
                Usuń 1000 elementów ze środka
            </button>
            <button @click="() => initRemoveTest(5000)">
                Usuń 5000 elementów ze środka
            </button>
            <button @click="() => initRemoveEveryXTest(2)">
                Usuń co 2 element
            </button>
            <button @click="() => initRemoveEveryXTest(5)">
                Usuń co 5 element
            </button>
            <button @click="() => initRemoveEveryXTest(10)">
                Usuń co 10 element
            </button>
            <button @click="() => initUpdateTest()">Zmień 1 pole</button>
            <button @click="() => initUpdateKeepKeyTest()">
                Zmień wszystkie oprócz klucza
            </button>
            <button @click="() => initUpdateRowTest()">
                Zmień wszystkie wiersze
            </button>
            <button @click="() => initReverseTest()">Odwróć</button>
            <button @click="() => downloadResults()">Pobierz wyniki</button>
        </div>
        <div v-for="item in items" :key="item.id">
            <div>{{ item.id }}</div>
            <div>{{ item.first_name }}</div>
            <div>{{ item.last_name }}</div>
            <div>{{ item.email }}</div>
            <div>{{ item.gender }}</div>
            <div>{{ item.animal }}</div>
        </div>
    </div>
</template>
