const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    isCat: { type: Boolean, required: true, default: false },
    cache: { type: String, required: false,
    
        get: function(data) {
            try { 
              return JSON.parse(data);
            } catch(err) { 
              return data;
            }
          },
          set: function(data) {
            return JSON.stringify(data);
          }
    },
    lastRefreshed: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Topic', schema);