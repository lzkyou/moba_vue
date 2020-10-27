const { request } = require("express");

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  avatar: String,
  title: String,
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  scores: {
    difficult: Number,
    skills: Number,
    attack: Number,
    survive: Number,
  },
  skills: [{
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    tips: { type: String },
  }],
  goodItems: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  badItems: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  usageTips: String,
  battleTips: String,
  teamTips: String,
  parners: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: String,
  }]
})

module.exports = mongoose.model('Hero', schema)