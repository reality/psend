# psend - library for multiple communications

## Overview

This library will be a modular system for allowing a standard interface for
sending messages over multiple protocols.

## Use Cases

### Website User Model

On *Reality's Cool Service*, people can register accounts. When registering for
an account they must provide a contact address. While traditionally this is
email, *Reality's Cool Service* is using the psend library - so the user can
sign up with any number of contact addresses including IRC, Jabber, Email,
Twitter, StatusNet, Pump.IO.

On the registration form, there will be a drop-down box allowing the user to
pick any of the supported services and upon picking one they will be asked for
the 'local' part of this address which identifies them on the server.

This will be stored in a format parallel to a URI, examples:

* pump://danharibo@identi.ca
* twitter://nourishedcloud
* statusnet://giammi@quitter.se
* jabber://batman@talk.google.com

These URIs will be stored in the user record under perhaps 'contact,' and when
it comes time to send a message to the user - say to reset their password, the
code will be a little something like this:

```javascript
var passwordResetLink = generatePasswordResetLink(user);
psend.sendMessage(user.contact, 'Reset your password at: ' + passwordResetLink);
```

Upon which psend will use the URI to send the message to the user at the
specified location using the specified method.

Because most contact methods require an account for a message to be sent to a
user, *Reality's Cool Service* will be required to set up an account to be able
to use a particular service with psend. This will be done by choosing the
contact methods you wish to enable and supplying credentials in either a config 
file or during the importation of the library in the client software.

Another feature of this library will be to provide for services which generally
don't support 'long' messages (e.g. Twitter) in the case that is required due to
the type of message (e.g. newsletters). I'm thinking the best way to approach
this is to hook into a web server the client software is using and simply send a
link to a web page where the user can read their full message. 

### Service Intercommunication Model

In the case of a 'complicit' server which has been set up with psend support by
implementing some form of virtual users, this library could be used to bridge 
communications between protocols. For example irc://reality@irc.freenode.org
could have a conversation with jabber://yamatt@talk.google.com through a virtual
user set up by the psend library on one end.
