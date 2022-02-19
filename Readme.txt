Problem Statement
Treatment Plan: As a User, I should be able to create, view, edit, delete and reuse a treatment plan.
 Every treatment plan will have these basic details:
1.Treatment Plan Name
2.Treatment plan code (unique)
3.Treatment Plan Description
4.Version (unique)
5.Status - DRAFT or PUBLISHED (enum)
6.Review Date (Future Date)
7.Priority
8.audit info
9.delete flag

I can update the treatment plan. It will create a new version of the block. Previous versions will still exist.
The versioning will follow given method:
For draft versions:
Draft versions will have decimal versions e.g. 1.001,1.002, 2.005 etc.
Draft versions will always increment to the latest draft i.e. if the latest draft for a Treatment Plan is 2.002, the next draft will 
be 2.003 even if 2.001 is published.
Newly created Treatment Plans will have version 0.001.
Any change on the draft will save it as the same version. e.g. If I make changes to draft version 3.001, it will still be 3.001 
version until I publish it. After I publish, it will become published version 4.0.
For published versions: Published versions will have integer versions e.g. 1.0, 2.0, 3.0 etc.
I can search and view the previously created treatment plan (in a card format) in the listing view. It should display the actions 
in the card as icons.



Treatment Management APi 
-->Treatment_Api

The Folder contains:
                    -->src folder :it contains all the code in a mvc folder structure
                    -->.env file  :contains the environment variables
                    -->data.log   :contains the log
                    -->prettier  :used for formatting our code
                    -->package.json                
