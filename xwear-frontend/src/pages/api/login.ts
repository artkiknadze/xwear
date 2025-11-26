import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const USERS = [
  {
    email: "user@mail.com",
    password: "password",
    first_name: "Іван",
    last_name: "Іванов",
    phone: "+380123456789",
    company: "",
    country: "Україна",
    street: "вул. Шевченка, 1",
    house: "1",
    city: "Київ",
    region: "Київська",
    zip: "01001",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json({
      user: USERS[0],
    });
  }

  if (req.method === "PUT") {
    const {
      first_name,
      last_name,
      phone,
      company,
      country,
      street,
      house,
      city,
      region,
      zip,
    } = req.body;
    const user = USERS[0];
    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.phone = phone || user.phone;
    user.company = company || user.company;
    user.country = country || user.country;
    user.street = street || user.street;
    user.house = house || user.house;
    user.city = city || user.city;
    user.region = region || user.region;
    user.zip = zip || user.zip;
    return res.status(200).json({ user });
  }

  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return res.status(401).json({ message: "Невірні дані" });
    }

    const fakeToken = Buffer.from(`${email}:${Date.now()}`).toString("base64");

    const cookie = serialize("token", fakeToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
      sameSite: "lax",
    });
    res.setHeader("Set-Cookie", cookie);

    return res.status(200).json({ message: "OK" });
  }
}
