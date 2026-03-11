"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { User as UserIcon, MapPin, LogOut, Lock, Pencil } from "lucide-react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

interface ProfileUser {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  photo?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}

const ProfilePage = () => {
  const { user, setUser, logout } = useAuth();
  const axiosPublic = useAxiosPublic();

  const currentUser = user as ProfileUser;

  const nameParts = useMemo(() => {
    return (currentUser?.name || "").split(" ");
  }, [currentUser]);

  const [profileData, setProfileData] = useState({
    firstName: nameParts[0] || "",
    lastName: nameParts.slice(1).join(" "),
    phone: currentUser?.phone || "",
    photo: currentUser?.photo || "",
  });

  const [addressData, setAddressData] = useState({
    address: currentUser?.address || "",
    city: currentUser?.city || "",
    state: currentUser?.state || "",
    postalCode: currentUser?.postalCode || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);



const handleImageUpload = async (file: File) => {
  try {
    if (!process.env.NEXT_PUBLIC_IMGBB_KEY) throw new Error("IMGBB key missing");

    const formData = new FormData();
    formData.append("image", file);

    // Upload to imgbb
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (!data.success) throw new Error("Image upload failed");

    const imageUrl = data.data?.url || data.data?.display_url;
    if (!imageUrl) throw new Error("No image URL returned from IMGBB");

    
    setProfileData((prev) => ({ ...prev, photo: imageUrl }));

    
    const updateRes = await axiosPublic.put(
      "/api/auth/update-profile",
      { photo: imageUrl },
      { headers: { "Content-Type": "application/json" } }
    );


    setUser(updateRes.data.data.user);

    toast.success("Profile image updated successfully!");

  } catch (err) {
    console.error(err);
    toast.error("Image upload failed");
  }
};

  // UPDATE PROFILE

  const updateProfile = async () => {
    setLoading(true);

    try {
      const payload = {
        name: `${profileData.firstName} ${profileData.lastName}`,
        phone: profileData.phone,
        photo: profileData.photo,
      };

      const res = await axiosPublic.put("/api/auth/update-profile", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

    //   if (res.data.success) {
        toast.success("Profile updated successfully");
        setUser(res.data.data.user);
        
    //   }
    } catch {
      toast.error("Profile update failed");
    }

    setLoading(false);
  };

  // UPDATE ADDRESS

  const updateAddress = async () => {
    setLoading(true);

    try {
      const res = await axiosPublic.put(
        "/api/auth/update-profile",
        addressData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

    
        toast.success("Address updated");
        setUser(res.data.data.user);

    } catch {
      toast.error("Address update failed");
    }

    setLoading(false);
  };

  // CHANGE PASSWORD

  const changePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axiosPublic.put(
        "/api/auth/change-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (res.data.success) {
        toast.success("Password changed");

        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch {
      toast.error("Password change failed");
    }
  };

  return (
    <div className="container mx-auto px-10 py-10 max-w-5xl">
      <h1 className="text-3xl font-bold mb-10 px-6">My Account</h1>

      {/* PROFILE */}

      <section className="bg-white p-6 rounded-xl mb-10">
        <div className="flex items-center gap-2 mb-6">
          <UserIcon size={16} /> User Information
        </div>

        {/* IMAGE */}

        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <Image
              src={profileData.photo || "/images/logo.png"}
              alt="profile"
              width={96}
              height={96}
              priority
              className="rounded-full object-cover border"
            />

            <label className="absolute bottom-0 right-0 bg-black text-white p-1.5 rounded-full cursor-pointer">
              <Pencil size={14} />

              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  e.target.files && handleImageUpload(e.target.files[0])
                }
              />
            </label>
          </div>
        </div>

        {/* INPUTS */}

        <div className="grid md:grid-cols-2 gap-6">
          <input
            value={profileData.firstName}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
            className="border p-3 rounded-lg"
            placeholder="First Name"
          />

          <input
            value={profileData.lastName}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                lastName: e.target.value,
              }))
            }
            className="border p-3 rounded-lg"
            placeholder="Last Name"
          />

          <input
            value={currentUser?.email || ""}
            disabled
            className="border p-3 rounded-lg bg-gray-100"
          />

          <input
            value={profileData.phone}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
            className="border p-3 rounded-lg"
            placeholder="Phone"
          />
        </div>

        <button
          onClick={updateProfile}
          disabled={loading}
          className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </section>

      {/* ADDRESS */}

      <section className="bg-white  p-6 rounded-xl mb-10">
        <div className="flex items-center gap-2 mb-6">
          <MapPin size={16} /> Shipping Address
        </div>

        <input
          value={addressData.address}
          onChange={(e) =>
            setAddressData((prev) => ({
              ...prev,
              address: e.target.value,
            }))
          }
          className="border p-3 rounded-lg w-full"
          placeholder="Address"
        />

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <input
            value={addressData.city}
            onChange={(e) =>
              setAddressData((prev) => ({
                ...prev,
                city: e.target.value,
              }))
            }
            className="border p-3 rounded-lg"
            placeholder="City"
          />

          <input
            value={addressData.state}
            onChange={(e) =>
              setAddressData((prev) => ({
                ...prev,
                state: e.target.value,
              }))
            }
            className="border p-3 rounded-lg"
            placeholder="State"
          />

          <input
            value={addressData.postalCode}
            onChange={(e) =>
              setAddressData((prev) => ({
                ...prev,
                postalCode: e.target.value,
              }))
            }
            className="border p-3 rounded-lg"
            placeholder="Postal Code"
          />
        </div>

        <button
          onClick={updateAddress}
          className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
        >
          Update Address
        </button>
      </section>

      {/* PASSWORD */}

      <section className="bg-white  p-6 rounded-xl mb-10">
        <div className="flex items-center gap-2 mb-6">
          <Lock size={16} /> Change Password
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <input
            type="password"
            placeholder="Current Password"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData((prev) => ({
                ...prev,
                currentPassword: e.target.value,
              }))
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }))
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            className="border p-3 rounded-lg"
          />
        </div>

        <button
          onClick={changePassword}
          className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
        >
          Change Password
        </button>
      </section>

      <button
        onClick={logout}
        className="flex items-center gap-2 text-red-500 border border-red-200 px-6 py-2 rounded-full"
      >
        <LogOut size={16} /> Log Out
      </button>
    </div>
  );
};

export default ProfilePage;
