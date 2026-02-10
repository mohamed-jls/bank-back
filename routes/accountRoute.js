import express from "express";
import Account from "../models/account.js";

const router = express.Router();

router.get('/by-client/:clientId', async (req, res) => {
    try {
        const id = req.params.clientId;
        const accounts = await Account.find({clientId: id});
        if (accounts.length == 0) return res.status(404).json({ message: "accounts not found" });
        res.json(accounts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const account = await Account.findById(id);
        if (!account) return res.status(404).json({ message: "account not found" });
        res.json(account);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});

router.post("/", async (req, res) => {
    try {
        const account = new Account({ ...req.body });
        await account.save();
        res.status(201).json(account);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});

router.put("/transaction", async (req, res) => {
    try {
        const { sender, receiver, amount } = req.body;
        if (!sender || !receiver || !amount) return res.status(400).json({ message: "invalid transaction data" });

        const sender_acc = await Account.findById(sender);
        if (!sender_acc) return res.status(404).json({ message: "sender not found" });

        const receiver_acc = await Account.findById(receiver);
        if (!receiver_acc) return res.status(404).json({ message: "receiver not found" });

        sender_acc.balance -= Number(amount);
        sender_acc.transactions.push({
            from: sender,
            to: receiver,
            amount,
        });

        receiver_acc.balance += Number(amount);
        receiver_acc.transactions.push({
            from: sender,
            to: receiver,
            amount,
        });
        await sender_acc.save();
        await receiver_acc.save();
        
        res.json({message: 'transaction succefull'})
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const account = await Account.findByIdAndUpdate(id, req.body, { new: true });
        if (!account) return res.status(404).json({ message: "account not found" });
        res.json(account);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const account = await Account.findByIdAndDelete(id);
        if (!account) return res.status(404).json({ message: "account not found" });
        res.json({ message: "account deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});


export default router;
