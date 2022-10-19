!macro customInstall
  File /oname=$PLUGINSDIR\01_wsl-install.bat "${BUILD_RESOURCES_DIR}\01_wsl-install.bat"
  ExecWait '"$WINDIR\explorer.exe" "${BUILD_RESOURCES_DIR}\01_wsl-install.bat"'
!macroend