require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-belt-indicator"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  react-native-belt-indicator
                   DESC
  s.homepage     = "https://github.com/jose31canizar/react-native-belt-indicator"
  # brief license entry:
  s.license      = "MIT"
  # optional - use expanded license entry instead:
  # s.license    = { :type => "MIT", :file => "LICENSE" }
  s.authors      = { "José Cañizares" => "josedanielcanii@gmail.com" }
  s.ios.deployment_target = '9.0'
  s.tvos.deployment_target = '9.0'
  s.source       = { :git => "git@github.com:jose31canizar/react-native-belt-indicator.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,c,m,swift}"

  s.pod_target_xcconfig = { 'DEFINES_MODULE' => 'YES' }

  s.dependency "React-Core"
end

