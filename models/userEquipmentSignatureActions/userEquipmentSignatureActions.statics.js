const mongoose = require('mongoose');
const UserEquipmentInventory = require('./../userEquipmentInventory/userEquipmentInventory.model');
const { ACTION_TYPES } = require('./userEquipmentSignatureActions.constants');

async function createWithUserInventoryUpdate(data) {
  const model = this;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const doc = new model(data);
    await doc.save({ session });

    let userInventoryToUpdate = await UserEquipmentInventory.findOne({
      userId: doc.userId,
    }).session(session);

    if (!userInventoryToUpdate) {
      userInventoryToUpdate = await UserEquipmentInventory.create(
        [
          {
            userId: doc.userId,
            items: doc.items.map((item) => ({
              serialNumber: item.serialNumber,
              equipmentId: item.equipmentId,
              quantity:
                item.actionType === ACTION_TYPES.SIGNATURE
                  ? item.quantity
                  : -1 * item.quantity,
            })),
          },
        ],
        { session }
      );
      await session.commitTransaction();
      session.endSession();
      return doc;
    }

    const newItems = [];
    doc.items.forEach((item) => {
      let itemFound = false;
      userInventoryToUpdate.items.forEach((inventoryItem) => {
        if (
          inventoryItem.equipmentId.toString() === item.equipmentId.toString()
        ) {
          itemFound = true;

          if (item.actionType === ACTION_TYPES.SIGNATURE) {
            inventoryItem.quantity = inventoryItem.quantity + item.quantity;
          }
          if (item.actionType === ACTION_TYPES.RETURN) {
            inventoryItem.quantity = inventoryItem.quantity - item.quantity;
          }
        }
      });
      if (!itemFound) {
        newItems.push({
          equipmentId: item.equipmentId,
          quantity: item.quantity,
        });
      }
    });

    newItems.forEach((item) => {
      userInventoryToUpdate.items.push({
        equipmentId: item.equipmentId,
        quantity: item.quantity,
      });
    });

    userInventoryToUpdate.markModified('items');
    const saved = await userInventoryToUpdate.save({ session });

    await session.commitTransaction();
    return doc;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

module.exports = { createWithUserInventoryUpdate };
