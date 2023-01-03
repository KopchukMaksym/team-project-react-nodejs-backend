const { isValidObjectId } = require('mongoose');
const Pet = require('../../models/petModel');
const { createError } = require('../../helpers/createError');
const petsMessages = require('../../helpers/petsMessages');

const { NOT_VALID_ID, NOT_FOUND_PET } = petsMessages;

const getPetByID = async (req, res) => {
    const { petId: id } = req.params;
    const { _id } = req.user;

    if (!isValidObjectId(id)) {
        throw createError({ status: 422, message: NOT_VALID_ID });
    }

    const data = await Pet.findOne({ _id: id, owner: _id });

    if (!data) {
        throw createError({ status: 404, message: NOT_FOUND_PET });
    }

    res.status(200).json(data);
}

module.exports = getPetByID;