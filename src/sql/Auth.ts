import { DATABASE, DBTypes } from "../Base";

const DB = DATABASE.define('Authentication', {
    filename: {
      type: DBTypes.STRING,
      allowNull: false
    },
    data: {
        type: DBTypes.JSON,
        allowNull: false
    }
});

export const getAuth = async(name = null) => {
    var Wher = {filename: name};
    var Msg = await DB.findAll({
        where: Wher
    });

    if (Msg.length < 1) {
        return false;
    } else {
        return Msg;
    }
}

export const setAuth = async(name = null, data = null) => {
    var Msg = await DB.findAll({
        where: {
            filename: name,
            data: JSON.stringify(data)
        }
    });
    console.log(Msg.length);
    if (Msg.length < 1) {
        return await DB.create({ filename: name, data: JSON.stringify(data) });
    } else {
        return await Msg[0].update({ data: JSON.stringify(data) });
    }
}

export const deleteAuth = async(name = null) => {
    var Msg = await DB.findAll({
        where: {
           filename: name
        }
    });
    if (Msg.length < 1) {
        return false;
    } else {
        return await Msg[0].destroy();
    }
}

