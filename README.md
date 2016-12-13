# "Reasons" - a YouTube behavior experiment

YouTube has made it too easy for me to enter the unending spiral of video-watching. I'm running an experiment to change my browsing behavior.

The hypothesis: if I'm forced to write down my reasons for coming to YouTube before I'm shown any content, I will be less likely to fall into a watching spiral.

Currently, this Chrome extension disables the content feed and search results, puts this functionality behind a toggle, and lets me input reasons on the YouTube front page, saving these reasons to a database.

![Screenshot](https://raw.githubusercontent.com/JimmyFW/cold-turkey/master/screenv2.png)

Upcoming high-level features
- Analytics
- Reasons

Analytics
Record when I visit YouTube, how long I spend per session

Reasons
I tend to quickly forget the reason why I came to YouTube in the first place. I want to be able to write down my original purpose for visiting the site.

- [x] Reason entry and storage
- [ ] Specify expected length of time to be spent on the site
- [ ] Require user to enter a reason in order to turn off blocking?

Backend: https://github.com/JimmyFW/withdrawal-log
