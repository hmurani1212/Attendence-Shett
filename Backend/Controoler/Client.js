const mongoose = require("mongoose");
const express = require("express")
const Client = require("../Models/Blog")
const router = express.Router();

exports.Client = async (req, res) => {
    try {
        const { name, email, PhoneNo, Address, status } = req.body
        console.log(req.body)
        if (!req.body || !req.body.name) {
            return res.status(400).json({ error: 'Please enter name, email, and ShortCode' });
        }
        const newClient = new Client(req.body);
        const savedClient = await newClient.save();
        res.status(201).json(savedClient); 
    } catch (error) {
        console.error('Error creating contractor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getClient = async (req, res) => {
    try {
        const client = await Client.find();
        if (!client || client.length === 0) {
            return res.status(404).json({ message: "No contractors found" });
        };
        const totalDeliveries = await Client.countDocuments();
        res.status(200).json({ message: "Successfully retrieved contractors", client, totalDeliveries });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getClint1 =  async (req, res) => {
    try {
        const staffId = req.params.id;
        // Use the findById method to find a staff member by ID
        const staffMember = await Client.findById(staffId);
        if (!staffMember) {
            return res.status(404).json({ message: "Staff member not found" });
        }
        res.status(200).json({ message: "Successfully retrieved staff member", staffMember });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };
exports.getUpdateClient = async (req, res) => {
    const clientId = req.params.id;
    try {
        // Check if the provided contractor ID is valid
        if (!clientId || !mongoose.Types.ObjectId.isValid(clientId)) {
            return res.status(400).json({ error: 'Invalid contractor ID' });
        }

        // Find the contractor by ID
        const client = await Client.findById(clientId);

        // Check if the contractor exists
        if (!client) {
            return res.status(404).json({ message: 'Contractor not found' });
        }
        const { name, PhoneNo, email, Address, status } = req.body
        client.name = req.body.name || client.name;
        client.PhoneNo = req.body.PhoneNo || client.PhoneNo;
        client.email = req.body.email || client.email;
        client.Address = req.body.Address || client.Address;
        client.status = req.body.status || client.status;
        // Save the updated contractor to the database
        const updatedclient = await client.save();

        res.status(200).json({ message: 'Contractor updated successfully', client: updatedclient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
 exports.deleteClient =  async (req, res) => {
    const clientId = req.params.id;
    try {
        // Check if the provided contractor ID is valid
        if (!clientId || !mongoose.Types.ObjectId.isValid(clientId)) {
            return res.status(400).json({ error: 'Invalid contractor ID' });
        }

        // Find the contractor by ID
        const contractor = await Client.findById(clientId);

        // Check if the contractor exists
        if (!clientId) {
            return res.status(404).json({ message: 'Contractor not found' });
        }
        // Delete the contractor from the database
        await Client.deleteOne({ _id: clientId });
        res.status(200).json({ message: 'Contractor deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// module.exports= router