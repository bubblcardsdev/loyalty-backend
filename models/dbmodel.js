import _restaurant from "./restaurant.cjs";
import _outlet from "./outlet.cjs";
import _user from "./user.cjs";
import _adminUser from "./adminUser.cjs";
import _menu from "./menu.cjs";
import _menuCategory from "./menuCategory.cjs";


export default function dbModel(sequelize, Sequelize) {
  const Restaurant = _restaurant(sequelize, Sequelize);
  const Outlet = _outlet(sequelize, Sequelize);
  const User = _user(sequelize, Sequelize);
  const AdminUser = _adminUser(sequelize, Sequelize);
  const Menu = _menu(sequelize, Sequelize);
  const MenuCategory = _menuCategory(sequelize, Sequelize);
 // Define associations


  return {
    Restaurant,
    Outlet,
    User,
    AdminUser,
    Menu,
    MenuCategory,
  };
}