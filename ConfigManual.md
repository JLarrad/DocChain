##Working Modes

###Sender-receiver:
Sends and receives. 
The sender method connects to the repository via qsocks API, collects the internal App ID defined in the configuration and builds the URL with the href necessary. 

The link options are:
- Document without parameters
- Sheet without parameters
- Sheet with parameters

###Receiver
Only Receives and applies filters.
Retrieves the fields from the "search" component of the URL and applies filters. It applies filters in order and in the same way as QlikView.

Field format is >> fieldName=value1,value2 and field separator & 

IMPORTANT NOTE: It doesn't work with multiple selections on the FIRST field in each data table. 
This means that the first field in each table will not work well with this extension. Just make sure you don't use them and issue solved. 


##Setup

- Choose the working mode. If the mode is "Only Receiver" you do not need anything else.
- Insert the IP server address hosting the destination App.
- Insert the name of the destination APP with " ". (The reason why the setup is done with App Name instead App ID it's because the name of the Apps should not change, and if it does, it's a "new one". Meanwhile, the ID itself can vary, that's why one of the tasks the code does is to ask to the repository for the App ID.)

AT THIS POINT WE'VE GOT A DYNAMIC URL TO ANOTHER SENSE APLICATION (I.E. Document Chaining from DashBoard to certain area document)

- Insert th destination sheet ID (Sheets don't change ID)

AT THIS POINT WE'VE GOT A DYNAMIC URL TO ANOTHER SENSE APLICATION INTO A CERTAIN SHEET

- Insert Filters with the above format >> FieldName1=value1,value2&FielName2=value3

FINALLY WE'VE GOT THE WHOLE DOC CHAIN VIA URL PARAMETERS.

- Insert your custom link name to make the link prettier. 
