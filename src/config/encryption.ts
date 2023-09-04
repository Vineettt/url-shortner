import bcrypt from "bcryptjs";

const SALT_ROUND = Number(process.env.SALT_ROUND);   

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(SALT_ROUND);
    return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword:string) => {
    bcrypt.compare(password, hashedPassword);
};

