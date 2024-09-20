var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//系统主页
var indexRouter = require('./routes/index');
//定义系统框架
var SystemHeader = require('./routes/SystemHeader');
var SystemLeft = require('./routes/SystemLeft');
var SystemRight = require('./routes/SystemRight');
var SystemFooter = require('./routes/SystemFooter');
//定义系统服务
var ServiceConf = require('./routes/ServiceConf');
//DNS配置
var DnsViewConf = require('./routes/DnsViewConf');
var DnsDomainConf = require('./routes/DnsDomainConf');
var DnsAclConf = require('./routes/DnsAclConf');
var DnsSourceIpConf = require('./routes/DnsSourceIpConf');
var DnsSafetyConf = require('./routes/DnsSafetyConf');
var DnsRecodeConf = require('./routes/DnsRecodeConf');
var DnsHighConf = require('./routes/DnsHighConf');

//DHCP配置
var DhcpIpv4SubnetConf = require('./routes/DhcpIpv4SubnetConf');
var DhcpIpv4Conf = require('./routes/DhcpIpv4Conf');
var DhcpIpv6SubnetConf = require('./routes/DhcpIpv6SubnetConf');
var DhcpIpv6Conf = require('./routes/DhcpIpv6Conf');
var DhcpAuthConf = require('./routes/DhcpAuthConf');
var DhcpGroupConf = require('./routes/DhcpGroupConf');
var DhcpOptionConf = require('./routes/DhcpOptionConf');
//定义反向代理
var NginxAgentConf = require('./routes/NginxAgentConf');
var NginxManagerConf = require('./routes/NginxManagerConf');

//IP地址管理
var IpamDiscover = require('./routes/IpamDiscover');
var IpamManager = require('./routes/IpamManager');
var IpamAcl = require('./routes/IpamAcl');


//系统设置
var SystemSettingsConf = require('./routes/SystemSettingsConf');
var SystemUserConf = require('./routes/SystemUserConf');
var SystemLogConf = require('./routes/SystemLogConf');
var SystemFaultConf = require('./routes/SystemFaultConf');
var SystemLicConf = require('./routes/SystemLicConf');
//定义新增域名
var addDnsDomainConf = require('./routes/addDnsDomainConf');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//首页，访问系统的首页面
app.use('/', indexRouter);
//主页面上下左右
app.use('/SystemHeader',SystemHeader);
app.use('/SystemLeft',SystemLeft);
app.use('/SystemRight',SystemRight);
app.use('/SystemFooter',SystemFooter);

//定义系统部署服务

app.use('/ServiceConf',ServiceConf);
//DNS功能模块
app.use('/DnsViewConf',DnsViewConf);
app.use('/DnsDomainConf',DnsDomainConf);
app.use('/DnsAclConf',DnsAclConf);
app.use('/DnsSourceIpConf',DnsSourceIpConf);
app.use('/DnsRecodeConf',DnsRecodeConf);
app.use('/DnsSafetyConf',DnsSafetyConf);
app.use('/DnsHighConf',DnsHighConf);
//DHCP功能模块
app.use('/DhcpIpv4SubnetConf',DhcpIpv4SubnetConf);
app.use('/DhcpIpv6SubnetConf',DhcpIpv6SubnetConf);
app.use('/DhcpIpv4Conf',DhcpIpv4Conf);
app.use('/DhcpIpv6Conf',DhcpIpv6Conf);
app.use('/DhcpAuthConf',DhcpAuthConf);
app.use('/DhcpGroupConf',DhcpGroupConf);
app.use('/DhcpOptionConf',DhcpOptionConf);
//Nginx反向代理
app.use('/NginxAgentConf',NginxAgentConf);
app.use('/NginxManagerConf',NginxManagerConf);

//地址管理模块
app.use('/IpamDiscover',IpamDiscover);
app.use('/IpamManager',IpamManager);
app.use('/IpamAcl',IpamAcl);


//系统设置
app.use('/SystemSettingsConf',SystemSettingsConf);
app.use('/SystemUserConf',SystemUserConf);
app.use('/SystemLogConf',SystemLogConf);
app.use('/SystemFaultConf',SystemFaultConf);
app.use('/SystemLicConf',SystemLicConf);

//添加域名提交的内容
app.use('/addDnsDomainConf',addDnsDomainConf);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
