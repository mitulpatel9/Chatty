import React, { useEffect } from "react";
import { useChatStore } from "../Store/UseChatStore";
import SidebarSkeleton from "./Skeleton/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../Store/useAuthStore";

function Sidebar() {
  const [showOnlineUsers, setShowOnlineUsers] = React.useState(false);
  const {
    selectedUser,
    getUsers,

    users,
    isUserLoading,

    setSelectedUser,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  const filteredUsers = showOnlineUsers
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading) return <SidebarSkeleton />;
  return (
    <>
      <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
        <div className="border-b border-base-300 w-full p-5">
          <div className="flex items-center gap-2">
            <Users className="size-6" />
            <span className="font-medium hidden lg:block">Contacts</span>
          </div>
          {/* to-do Online filter toggle */}
          <div className="flex items-center gap-2 mt-3">
            <input
              type="checkbox"
              id="showOnlineUsers"
              checked={showOnlineUsers}
              onChange={(e) => setShowOnlineUsers(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <label htmlFor="showOnlineUsers">Show Online Users</label>
            <span className="text-xs text-zinc-400">
              {onlineUsers.length - 1} online{" "}
            </span>
          </div>
        </div>
        <div className="overflow-y-auto w-full py-3">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }
            `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profileIMG || "/avtar.png"}
                  alt={user.name}
                  className="size-12 object-cover rounded-full"
                />

                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>

              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.name}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))}
          {filteredUsers.length === 0 && (
            <div className="w-full p-3 flex items-center gap-3">
              <div className="relative mx-auto lg:mx-0">
                <img
                  src="/avtar.png"
                  alt="No users"
                  className="size-12 object-cover rounded-full"
                />
              </div>
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">No users</div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
