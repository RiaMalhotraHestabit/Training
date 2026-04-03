# Error Logs – Todo App

## 1. Empty Todo Input
- **Issue:** User clicked Add without typing text
- **Handling:** Prevented using input trim check
- **Code:** if (value === "") return;

## 2. LocalStorage Parsing Error
- **Issue:** localStorage data might be corrupted
- **Handling:** Wrapped logic in try/catch
- **Result:** App does not crash, error logged in console

## 3. Edit Cancelled
- **Issue:** User cancels prompt
- **Handling:** Checked for null or empty value
