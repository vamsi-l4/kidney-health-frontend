# TODO: Fix 401 Unauthorized on /api/reports

## Steps to Complete
- [x] Add authentication check in client/src/pages/Reports.jsx (redirect to login if not authenticated)
- [x] Add authentication check in client/src/pages/Detection.jsx (redirect to login if not authenticated)
- [x] Add authentication check in client/src/pages/PatientDetails.jsx (redirect to login if not authenticated)
- [x] Add 401 error handling in client/src/services/api.js (redirect to login on 401)
- [ ] Test the fixes by running server and client, logging in, and accessing /reports
- [ ] Verify no more 401 errors in logs
