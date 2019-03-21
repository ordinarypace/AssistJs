export default ({ target }) => {
    const selected = target[target.selectedIndex];

    return {
        value: selected.value,
        index: target.selectedIndex,
        text: selected.innerHTML
    }
};