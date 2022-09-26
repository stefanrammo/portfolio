const bcrypt = require("bcryptjs");

const db = require("../data/database");

class User {
  constructor(email, password, full_name, street, zip_code, city) {
    this.email = email;
    this.password = password;
    this.name = full_name;
    this.address = { street: street, zip_code: zip_code, city: city };
  }

  getUserWithSameEmail() {
    return db.getDb().collection('users').findOne({ email: this.email});
  }

  async existsAlready() {
    const existingUser = await this.getUserWithSameEmail();
    if (existingUser) {
      return true;
    }
    else {
      return false;
    }
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

  comparePassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;