import BreadCrum from "../components/BreadCrum";
import { FaRegUser } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { RiShoppingBag3Line } from "react-icons/ri";
import { baseUrl } from "../../config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const Profile = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.userSlice);
  const navigate = useNavigate();

  const logoutFunction = async () => {
    try {
      const url: string = `${baseUrl}/api/v1/user_logout`;

      const res = await axios.get(url, { withCredentials: true });
      if (res.data.success) {
        dispatch(logoutSuccess());
        toast.success("Logout Successfull !!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BreadCrum title={"My Profile"} />
      <div className="commonSection myProfile">
        <div className="container">
          <div className="tab">
            <ul>
              <li>
                <button className="iconButton flex alignCenter">
                  <FaRegUser /> My Profile
                </button>
              </li>
              {userData?.userData?.user?.role == "admin" ? (
                <li>
                  <button className="iconButton flex alignCenter">
                    <MdOutlineAdminPanelSettings /> My Dashboard
                  </button>
                </li>
              ) : (
                ""
              )}

              <li>
                <button
                  className="iconButton flex alignCenter"
                  onClick={() => {
                    navigate("/orders");
                  }}
                >
                  <RiShoppingBag3Line /> Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => logoutFunction()}
                  className="iconButton flex alignCenter"
                >
                  <GrLogout /> Logout
                </button>
              </li>
            </ul>
          </div>
          <div className="content">
            <div className="profile flex justifyContentBetween">
              <div className="data">
                <h4 className="flex">
                  <span>Name:</span> {userData?.userData?.user?.user_name}
                </h4>
                <h4 className="flex">
                  <span>Email:</span> {userData?.userData?.user?.email}
                </h4>
                <h4 className="flex">
                  <span>Phone:</span> {userData?.userData?.user?.phone}
                </h4>
                <h4 className="flex capitaliz">
                  <span>Gender:</span> {userData?.userData?.user?.gender}
                </h4>
                <h4 className="flex">
                  <span>Dob:</span>{" "}
                  {new Date(userData?.userData?.user?.dob).getDate()}/
                  {new Date(userData?.userData?.user?.dob).getMonth()}/
                  {new Date(userData?.userData?.user?.dob).getFullYear()}
                </h4>
                <h4 className="flex">
                  <span>Address:</span> {userData?.userData?.user?.address}
                </h4>
              </div>
              <div className="img">
                {userData?.userData?.user?.photo ? (
                  <img src={userData?.userData?.user?.photo} />
                ) : (
                  <img src="/noimage.png" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
