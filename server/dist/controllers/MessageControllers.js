"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = exports.sendMessage = void 0;
const ConversationModel_1 = __importDefault(require("../models/ConversationModel"));
const MessageModel_1 = __importDefault(require("../models/MessageModel"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const socket_1 = __importDefault(require("../socket/socket"));
const { io, getReceiverSocketId } = socket_1.default;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        if (!message || !receiverId)
            return res.status(401).json({ message: "Missing Entries" });
        const user = yield UserModel_1.default.findOne({ email: (_a = res.locals.jwtData) === null || _a === void 0 ? void 0 : _a.email });
        if (!user)
            return res.status(401).json({ message: "User not found" });
        const senderId = user === null || user === void 0 ? void 0 : user._id;
        let conversation = yield ConversationModel_1.default.findOne({
            participants: { $all: [receiverId, senderId] },
        });
        if (!conversation)
            conversation = yield ConversationModel_1.default.create({
                participants: [receiverId, senderId],
            });
        const newMessage = new MessageModel_1.default({
            message,
            receiverId,
            senderId,
        });
        if (conversation)
            conversation.messages.push(newMessage._id);
        yield Promise.all([conversation.save(), newMessage.save()]);
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId)
            io.to(receiverSocketId).emit("newMessage", newMessage);
        res.status(200).json(message);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
exports.sendMessage = sendMessage;
const getMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { id: receiverId } = req.params;
        if (!receiverId)
            return res.status(401).json({ message: "Missing Entries" });
        const user = yield UserModel_1.default.findOne({ email: (_b = res.locals.jwtData) === null || _b === void 0 ? void 0 : _b.email });
        if (!user)
            return res.status(401).json({ message: "User not found" });
        const senderId = user === null || user === void 0 ? void 0 : user._id;
        const conversation = yield ConversationModel_1.default.findOne({
            participants: { $all: [senderId, receiverId] },
        }).populate("messages");
        if (!conversation)
            return res.status(200).json([]);
        const messages = conversation.messages;
        res.status(200).json(messages);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
exports.getMessage = getMessage;
