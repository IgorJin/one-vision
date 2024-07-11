import { NodeWrapperInterface } from './node-wrapper'
import { StyleType } from '../editor-panel/style-manager/stylesConfig'

const COMMAND_TYPES = {
  EDIT_TEXT: 'edit-text',
  EDIT_STYLE: 'edit-style',
  ADD_ELEMENT: 'add-element',
  DELETE_ELEMENT: 'delete-element',
  EDIT_LOCATION: 'edit-location',
}

type CommandItem = {
  id: string;
  type: string; //TODO map
  metadata: any;
}

type ChangedData = {
  parameter?: StyleType;
  value: string;
}

interface CommandInterface {
  execute(): void;
  cancel(): void;
  data: CommandItem;
  changedData: ChangedData;
  node: NodeWrapperInterface;
}

class CommandStorage {
  private commands: CommandInterface[] = [];

  addCommand(command: CommandInterface) {
    this.commands.push(command);
  }

  getCommand() {
    return this.commands.pop()
  }

  clearAll() {
    this.commands = [];
  }

  getAll() {
    return this.commands
  }
}

class CommandManager {
  private history: CommandStorage = new CommandStorage();
  private trash: CommandStorage = new CommandStorage();

  executeCommand(command: CommandInterface) {
    command.execute();

    this.history.addCommand(command)
    this.trash.clearAll()
  }
  undo() {
    const prevCommand = this.history.getCommand()

    if (!prevCommand) {
      return
    }

    prevCommand.cancel()
    this.trash.addCommand(prevCommand)
  }
  redo() {
    const nextCommand = this.trash.getCommand()

    if (!nextCommand) {
      return
    }

    nextCommand?.execute()
    this.history.addCommand(nextCommand!)
  }
}

export class EditTextCommand implements CommandInterface {
  data: CommandItem
  node: NodeWrapperInterface
  changedData: ChangedData

  constructor(node: NodeWrapperInterface, changedData: ChangedData) {
    this.data = {
      id: node.id,
      type: COMMAND_TYPES.EDIT_TEXT,
      metadata : {},
    }
    
    this.node = node
    this.changedData = changedData
  }

  execute() {
    this.data.metadata = {
      previousState: {
        value: this.node.current.innerText,
      }
    }

    this.node.current.innerText = this.changedData.value
  }

  cancel() {
    this.node.current.innerText = this.data.metadata.previousState.value
  }
}

export class EditStyleCommand implements CommandInterface {
  data: CommandItem
  node: NodeWrapperInterface
  changedData: ChangedData

  constructor(node: NodeWrapperInterface, changedData: ChangedData) {
    this.data = {
      id: node.id,
      type: COMMAND_TYPES.EDIT_STYLE,
      metadata: {},
    }

    this.node = node
    this.changedData = changedData
  }

  execute(): void {
    this.data.metadata = {
      previousState: {
        value: this.node.current.innerText,
        parameter: this.changedData.parameter,
      }
    }

    this.node.current.style[this.changedData.parameter!] 
    // elementRef.current. = styleState[name];
  }
  cancel(): void {
    
  }
}

// export class EditLocation implements CommandInterface {
//   private storage: CommandStorage
//   type: string

//   constructor(storage: CommandStorage) {
//     this.storage = storage
//     this.type = COMMAND_TYPES.EDIT_LOCATION
//   }

//   execute(id: string, value: string, metadata: object) {
//     this.storage.addCommand({
//       id,
//       type: this.type,
//       value,
//       metadata,
//     })
//   }
// }

// export class AddElement implements CommandInterface {
//   private storage: CommandStorage
//   type: string

//   constructor(storage: CommandStorage) {
//     this.storage = storage
//     this.type = COMMAND_TYPES.ADD_ELEMENT
//   }

//   execute(id: string, value: string, metadata: object) {
//     this.storage.addCommand({
//       id,
//       type: this.type,
//       value,
//       metadata,
//     })
//   }
// }

// export class DeleteElement implements CommandInterface {
//   private storage: CommandStorage
//   type: string

//   constructor(storage: CommandStorage) {
//     this.storage = storage
//     this.type = COMMAND_TYPES.DELETE_ELEMENT
//   }

//   execute(id: string, value: string, metadata: object) {
//     this.storage.addCommand({
//       id,
//       type: this.type,
//       value,
//       metadata,
//     })
//   }
// }

// export class UndoCommand implements CommandInterface {
//   private storage: CommandStorage

//   constructor(storage: CommandStorage) {
//     this.storage = storage
//   }

//   execute(id: string, value: string, metadata: object) {
//     this.storage.addCommand({
//       id,
//       type: this.type,
//       value,
//       metadata,
//     })
//   }
// }

// export class RendoCommand implements CommandInterface {
//   private storage: CommandStorage

//   constructor(storage: CommandStorage) {
//     this.storage = storage
//   }

//   execute() {
//     this.storage.deleteCommand()
//   }
// }