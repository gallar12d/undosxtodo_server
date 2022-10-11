import { UserRepository } from "../domain/user.respository";
import { UserValue } from "../domain/user.value";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async registerUser({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    const userValue = new UserValue({ name, email, password });
    const encripted_password = await this.userRepository.encriptPassword(
      userValue.password
    );
    userValue.encript(encripted_password);

    const userCreated = await this.userRepository.registerUser(userValue);

    const user_response = {
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
      token: this.createToken(userCreated.id),
    };
    return user_response;
  }

  public createToken = (id: string) => {
    const token = this.userRepository.createToken(id);
    return token;
  };

  public async findUser(id: string) {
    const user = await this.userRepository.findUser(id);
    return user;
  }

  public async userExist(email: string) {
    const user = await this.userRepository.findUserByEmail(email);
    if (user) return true;
    return false;
  }

  public async allUser() {
    const users = await this.userRepository.allUser();
    return users;
  }

  public async loginUser(email: string, password: string) {
    const user = await this.userRepository.loginUser(email, password);
    if (!user) return null;
    const user_response = {
      id: user.id,
      name: user.name,
      email: user.email,
      token: this.createToken(user.id),
    };
    return user_response;
  }
}
