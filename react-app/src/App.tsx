import { useState } from "react";
import {
    slice1,
    slice2,
    performTest,
    downloadResults,
    DataRow,
} from "common/utlis";

function App() {
    const [items, setItems] = useState<DataRow[]>([]);

    const initAdditionTest = () => {
        performTest(
            "react-addition",
            () => {
                setItems([]);
            },
            () => {
                setItems(slice1);
            }
        );
    };

    const initAppendFrontTest = () => {
        performTest(
            "react-appendFront",
            () => {
                setItems(slice1);
            },
            () => {
                setItems((items) => slice2.concat(items));
            }
        );
    };

    const initAppendTest = () => {
        performTest(
            "react-append",
            () => {
                setItems(slice1);
            },
            () => {
                setItems((items) => items.concat(slice2));
            }
        );
    };

    const initRemoveTest = (deleteCount: number) => {
        const border1 = Math.floor((items.length - deleteCount) / 2);
        const border2 = border1 + deleteCount;

        performTest(
            `react-remove${deleteCount}`,
            () => {
                setItems(slice1);
            },
            () => {
                setItems((items) =>
                    items.slice(0, border1).concat(items.slice(border2))
                );
            }
        );
    };

    const initRemoveEveryXTest = (x: number) => {
        performTest(
            `react-removeEvery${x}`,
            () => {
                setItems(slice1);
            },
            () => {
                setItems((items) => items.filter((_, idx) => idx % x !== 0));
            }
        );
    };

    const initUpdateTest = () => {
        performTest(
            "react-update",
            () => {
                setItems(slice1);
            },
            () => {
                setItems((items) =>
                    items.map((item, idx) => ({
                        ...item,
                        first_name: slice2[idx].first_name,
                    }))
                );
            }
        );
    };

    const initUpdateKeepKeyTest = () => {
        performTest(
            "react-updateKeepKey",
            () => {
                setItems(slice1);
            },
            () => {
                setItems((items) =>
                    items.map((item, idx) => ({
                        ...slice2[idx],
                        id: item.id,
                    }))
                );
            }
        );
    };

    const initUpdateRowTest = () => {
        performTest(
            "react-updateRow",
            () => {
                setItems(slice1);
            },
            () => {
                setItems(slice2);
            }
        );
    };

    const initReverseTest = () => {
        performTest(
            "react-reverse",
            () => {
                setItems(slice1);
            },
            () => {
                setItems((items) => items.toReversed());
            }
        );
    };

    return (
        <div>
            <div>
                <button onClick={() => initAdditionTest()}>
                    Dodaj 10 000 elementów
                </button>
                <button onClick={() => initAppendTest()}>
                    Dodaj 10 000 elementów na koniec
                </button>
                <button onClick={() => initAppendFrontTest()}>
                    Dodaj 10 000 elementów na początek
                </button>
                <button onClick={() => initRemoveTest(1)}>
                    Usuń 1 element ze środka
                </button>
                <button onClick={() => initRemoveTest(1000)}>
                    Usuń 1000 elementów ze środka
                </button>
                <button onClick={() => initRemoveTest(5000)}>
                    Usuń 5000 elementów ze środka
                </button>
                <button onClick={() => initRemoveEveryXTest(2)}>
                    Usuń co 2 element
                </button>
                <button onClick={() => initRemoveEveryXTest(5)}>
                    Usuń co 5 element
                </button>
                <button onClick={() => initRemoveEveryXTest(10)}>
                    Usuń co 10 element
                </button>
                <button onClick={() => initUpdateTest()}>Zmień 1 pole</button>
                <button onClick={() => initUpdateKeepKeyTest()}>
                    Zmień wszystkie oprócz klucza
                </button>
                <button onClick={() => initUpdateRowTest()}>
                    Zmień wszystkie wiersze
                </button>
                <button onClick={() => initReverseTest()}>Odwróć</button>
                <button onClick={() => downloadResults()}>
                    Pobierz wyniki
                </button>
            </div>
            {items.map((item) => (
                <div key={item.id}>
                    <div>{item.id}</div>
                    <div>{item.first_name}</div>
                    <div>{item.last_name}</div>
                    <div>{item.email}</div>
                    <div>{item.gender}</div>
                    <div>{item.animal}</div>
                </div>
            ))}
        </div>
    );
}

export default App;
