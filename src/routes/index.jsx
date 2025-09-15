import { Routes, Route } from "react-router-dom";

import { ProtectedRoute } from "../Components/authCmpnts/ProtectedRoute";
import { PublicRoute } from "../Components/authCmpnts/PublicRoute";

import AppLayout from "../layouts/AppLayout"; // ⬅️ import the layout

// Public pages
import LandingPage from "../pages/public/LandingPage";
import Login from "../pages/public/Login";
import Signup from "../pages/public/Signup";
import VerifyEmail from "../services/VerifyEmail";

// Dashboard
import Overview from "../features/Dashboard/pages/Overview.jsx";
import MainDashBoard from "../features/Dashboard/pages/MainDashboard.jsx";
import Analytics from "../features/Dashboard/pages/Analytics.jsx";
import Report from "../features/Dashboard/pages/Report.jsx";

// Inbox
import InboxLayout from "../features/Inbox/components/AllMessageCmpnt/InboxPageContent/InboxLayout.jsx";
import AllMessages from "../features/Inbox/pages/AllMessages.jsx";
import Unread from "../features/Inbox/pages/Unread.jsx";
import Starred from "../features/Inbox/pages/Starred.jsx";
import Archived from "../features/Inbox/pages/Archived.jsx";
import Drafts from "../features/Inbox/pages/Drafts.jsx";
import Slack from "../features/Inbox/pages/Slack.jsx";
import Jira from "../features/Inbox/pages/Jira.jsx";
import Email from "../features/Inbox/pages/Email.jsx";
import HighPriority from "../features/Inbox/pages/HighPriority.jsx";
import ProjectAlpha from "../features/Inbox/pages/ProjectAlpha.jsx";
import BugFixes from "../features/Inbox/pages/BugFixes.jsx";
import Marketing from "../features/Inbox/pages/Marketing.jsx";

// Meetings
import Past from "../features/Meetings/pages/Past";
import MainMeeting from "../features/Meetings/pages/MainMeeting";
import ScheduleNew from "../features/Meetings/pages/ScheduleNew";
import Upcoming from "../features/Meetings/pages/Upcoming";

// Settings
import MainSetting from "../features/Settings/pages/MainSetting";
import Integrations from "../features/Settings/pages/Integrations";
import Preferences from "../features/Settings/pages/Preferences";
import Profile from "../features/Settings/pages/Profile";

// Tasks
import MainTask from "../features/Tasks/pages/MainTask";
import KanbanView from "../features/Tasks/pages/kanbanView";
import ListView from "../features/Tasks/pages/ListView";
import MyTasks from "../features/Tasks/pages/MyTasks";

// Team
import MainTeam from "../features/Team/pages/MainTeam";
import Members from "../features/Team/pages/Members";
import Permissions from "../features/Team/pages/Permissions";
import Roles from "../features/Team/pages/Roles";
import Notion from "../features/Inbox/pages/Notion.jsx";
import Calendar from "../features/Inbox/pages/Calendar.jsx";
import ToDo from "../features/Inbox/pages/To-DoList.jsx";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      {/* Email Verification (still standalone) */}
      <Route
        path="/verify"
        element={
          <ProtectedRoute>
            <VerifyEmail />
          </ProtectedRoute>
        }
      />

      {/* ✅ All protected routes wrapped in AppLayout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route path="/dashboard" element={<MainDashBoard />} />
        <Route path="dashboard/overview" element={<Overview />} />
        <Route path="dashboard/reports" element={<Report />} />
        <Route path="dashboard/analytics" element={<Analytics />} />

        {/* Inbox */}
        <Route path="/inbox" element={<InboxLayout />}>
          <Route index element={<AllMessages />} />
          <Route path="unread" element={<Unread />} />
          <Route path="starred" element={<Starred />} />
          <Route path="archived" element={<Archived />} />
          <Route path="drafts" element={<Drafts />} />
          <Route path="slack" element={<Slack />} />
          <Route path="jira" element={<Jira />} />
          <Route path="email" element={<Email />} />
          <Route path="highpriority" element={<HighPriority />} />
          <Route path="projectalpha" element={<ProjectAlpha />} />
          <Route path="bugfixes" element={<BugFixes />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="notion" element={<Notion />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="to-do" element={<ToDo />} />
        </Route>

        {/* Tasks */}
        <Route path="/tasks" element={<MainTask />} />
        <Route path="tasks/kanban-view" element={<KanbanView />} />
        <Route path="tasks/list-view" element={<ListView />} />
        <Route path="tasks/my-tasks" element={<MyTasks />} />

        {/* Team */}
        <Route path="/team" element={<MainTeam />} />
        <Route path="team/members" element={<Members />} />
        <Route path="team/roles" element={<Roles />} />
        <Route path="team/permissions" element={<Permissions />} />

        {/* Meetings */}
        <Route path="/meetings" element={<MainMeeting />} />
        <Route path="meetings/upcoming" element={<Upcoming />} />
        <Route path="meetings/past" element={<Past />} />
        <Route path="meetings/schedule-new" element={<ScheduleNew />} />

        {/* Settings */}
        <Route path="/settings" element={<MainSetting />} />
        <Route path="settings/profile" element={<Profile />} />
        <Route path="settings/preferences" element={<Preferences />} />
        <Route path="settings/integrations" element={<Integrations />} />
      </Route>
    </Routes>
  );
}
