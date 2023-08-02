# Authentication Method Tutorial:

This is a guide for finding certain authentication keys.

## PKI Keys

This is a guide to finding your public and private key for the system.

### First connect to the system using the host name

> For this tutorial, the example will be stampede2.tacc.utexas.edu

To connect to the system, run this command:

```bash
$ ssh <TACC Username>@<host name>
```

> Example:
>
> ```bash
> $ ssh jo25672@stampede2.tacc.utexas.edu
> ```

If done properly, it should prompt you to input a password and TACC_Token.

> If it is your first time connecting to the machine and the output is:
>
> ```
> The authenticity of host 'ls6.tacc.utexas.edu (129.114.62.201)' can't be established.
> <random code> key fingerprint is <random code>.
> This key is not known by any other names
> Are you sure you want to continue connecting (yes/no/[fingerprint])?
> ```
>
> answer with "yes" and press enter

### Generate ssh keys

After successfully connecting to the system, get to the `.ssh` directory:

```bash
$ cd .ssh
```

After being in the `.ssh` directory, run this command:

```bash
$ ssh-keygen -m PEM -f id_rsa
```

> If it prompts you with:
>
> ```
> id_rsa already exists.
> Overwrite (y/n)?
> ```
>
> answer with "y" and press enter
> IMPORTANT: Hit enter twice to keep the passphrase empty.

Congrats! You have successfully created public and private keys!

### Copying the public key

To print the public key, run this command:

```bash
$ cat id_rsa.pub
```

Copy everything from `ssh-rsa` to `<TACC Username>@<host name>` and paste it into the public key input field.

### authorized_keys

To see all files in the current `.ssh` directory, run this command:

```bash
$ ls -l
```

If there isn't an `authorized_keys` file, then create one with this command:

```bash
$ touch authorized_keys
```

Go into the file with your favorite text editor and paste the public key into the file and save.

### Copying the private key

To print the private key, run this command:

```bash
$ awk -v ORS='\\n' '1' id_rsa && echo
```

Copy everything from `-----BEGIN RSA PRIVATE KEY-----` to `\n-----END RSA PRIVATE KEY-----\n` and paste it into the private key input field.

Congrats! You have successfully added credentials to the system!
