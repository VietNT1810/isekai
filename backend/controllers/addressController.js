const { default: mongoose } = require("mongoose");
const Address = require("../models/addressModel");

const addAddress = async (req, res) => {
  try {
    const { fullName, address, ward, district, city, phone, defaultAddress } =
      req.body;
    const userId = req.user._id;
    const addressDoc = await Address.find({
      user: userId,
      defaultAddress: true,
    });
    if (addressDoc) {
      if (defaultAddress) {
        await Address.findOneAndUpdate(
          {
            user: userId,
            defaultAddress: true,
          },
          {
            defaultAddress: false,
          }
        );
        await Address.create({
          user: userId,
          ...req.body,
          defaultAddress: true,
        });
        return res
          .status(200)
          .json({ message: "Thêm địa chỉ mặc định thành công" });
      } else {
        await Address.create({
          user: userId,
          ...req.body,
        });
        return res
          .status(200)
          .json({ message: "Thêm địa chỉ không mặc định thành công" });
      }
    }
    await Address.create({
      user: userId,
      ...req.body,
      defaultAddress: true,
    });
    return res.status(200).json({ message: "Thêm địa chỉ thành công" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get user address
const getUserAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const addresses = await Address.find({ user: userId }).sort({
      defaultAddress: -1,
    });
    res.status(200).json({ content: addresses });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update
const updateUserAddress = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "This address not exist!" });
    }
    const address = await Address.findOneAndUpdate(
      {
        _id: id,
      },
      {
        ...req.body,
      }
    );
    if (!address) {
      return res.status(404).json({ message: "Địa chỉ không tồn tại" });
    }
    res.status(200).json({ message: "Chỉnh sửa địa chỉ thành công" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete
const deleteUserAddress = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "This address not exist!" });
    }
    const address = await Address.findOneAndDelete({ _id: id });
    if (!address) {
      return res.status(404).json({ error: "This address not exist!" });
    }
    res.status(200).json({ message: "Xóa địa chỉ thành công" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addAddress,
  getUserAddress,
  updateUserAddress,
  deleteUserAddress,
};
