const bcrypt = require("bcryptjs");

const db = require("../data/database");

class User {
  constructor(email, password, full_name, street, zip_code, city) {
    this.email = email;
    this.password = password;
    this.name = full_name;
    this.address = { street: street, zip_code: zip_code, city: city };
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address
    });
  }
}

module.exports = User;