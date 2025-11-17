// dbmodel.js
import _restaurant from "./restaurant.cjs";
import _adminUser from "./adminUser.cjs";
import _user from "./user.cjs";
import _userOtp from "./userOtp.cjs";
import _menuCategory from "./menuCategory.cjs";
import _menu from "./menu.cjs";
import _outlet from "./outlet.cjs";
import _tier from "./tier.cjs";
import _userTier from "./userTier.cjs";
import _offerType from "./offerType.cjs";
import _campaign from "./campaign.cjs";
import _offer from "./offer.cjs";
import _redeemedOffer from "./redeemedOffer.cjs";
import _point from "./point.cjs";
import _userPointHistory from "./userPointHistory.cjs";
import _activityType from "./activityType.cjs";
import _activity from "./activity.cjs";

export default function dbModel(sequelize, Sequelize) {
  // Initialize all models
  const Restaurant = _restaurant(sequelize, Sequelize);
  const AdminUser = _adminUser(sequelize, Sequelize);
  const User = _user(sequelize, Sequelize);
  const UserOtp = _userOtp(sequelize, Sequelize);
  const MenuCategory = _menuCategory(sequelize, Sequelize);
  const Menu = _menu(sequelize, Sequelize);
  const Outlet = _outlet(sequelize, Sequelize);
  const Tier = _tier(sequelize, Sequelize);
  const UserTier = _userTier(sequelize, Sequelize);
  const OfferType = _offerType(sequelize, Sequelize);
  const Campaign = _campaign(sequelize, Sequelize);
  const Offer = _offer(sequelize, Sequelize);
  const RedeemedOffer = _redeemedOffer(sequelize, Sequelize);
  const Point = _point(sequelize, Sequelize);
  const UserPointHistory = _userPointHistory(sequelize, Sequelize);
  const ActivityType = _activityType(sequelize, Sequelize);
  const Activity = _activity(sequelize, Sequelize);

  // Collect models into one object
  const models = {
    Restaurant,
    AdminUser,
    User,
    UserOtp,
    MenuCategory,
    Menu,
    Outlet,
    Tier,
    UserTier,
    OfferType,
    Campaign,
    Offer,
    RedeemedOffer,
    Point,
    UserPointHistory,
    ActivityType,
    Activity,
  };

  // Run associations
  Object.values(models).forEach((model) => {
    if (model.associate) {
      model.associate(models);
    }
  });

  return models;
}
