import GeneralObject from "../models/GeneralObject";

const getFormData = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    var entries = formData.entries();

    const res: GeneralObject = {};
    while (true) {
        var entry = entries.next();
        if (entry.done) break;
        res[entry.value[0]] = entry.value[1];
    }

    return res
};

export default getFormData