export const convertToPostDate = (unixtime: number) => {
    const date = new Date((unixtime + 9 * 3600) * 1000);
    // let x = date.toISOString().split("T");
    const month_strings = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    return `${month_strings[date.getUTCMonth()]} ${("0" + date.getUTCDate()).slice(-2)}, ${date.getUTCFullYear()}`;
};

export const convertToPostDateTime = (unixtime: number) => {
    const date = new Date((unixtime + 9 * 3600) * 1000);
    let x = date.toISOString().split("T");
    return `${x[0].replace(/-/g, "/")} ${x[1].substring(0, x[1].lastIndexOf(":"))}`;
};

export const scrollTop = () => {
    document.getElementById('content')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
};

export const basename = (path: string) => path.substring(0, path.lastIndexOf("/") + 1);