interface Options {
    title: string;
    icon: string;
}

class BaseMenu {
    constructor(options: Options) {
        this.title = options.title;
        this.icon = options.icon;
    }

    isDisabled() {
        return false;
    }
}

export class ButtonMenu extends BaseMenu {
    super();

    exec() {
        console.log('hello')
    }
}

export default class SelectMenu extends BaseMenu {
    super();

    exec() {
        return ['item1', 'item2', 'item3']
    }
}


const buttonM = new SelectMenu({
    title: 'fuck',
    icon: 'dsdsa'
});

console.log(buttonM.exec())

