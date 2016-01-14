# DocChain

This piece of code provides a pseudo document chaining in Sense via "search" component of the URL.
It builds on the qsocks project.

###How it Works

The extension has two working modes which you have to select in the configuration panel.

- Sender: Displays a dynamic URL to another sheet in another Sense document passing through the "search" component of the URL the fields and values you need to pass.
- Receiver: Reads the "search" URL component looking for parameters and makes the proper selections when needed.


##Limitations

For some reason I don't know why, the multiple selection doesn't work when you are selecting values for the FIRST field of every data table.
I supposse this issue is related to how Sense loads data into memory but really I don't know for sure.

The number of fields and values you can pass in the "search" URL is limited by the maximum size of the URL in each web browser. The extension itself doesn't have any limitation hardcoded.


##Further Notes

This extension is still under development and there is a chance of not working 100%.

English translation in progress.
