describe("Project Controller", function() {
    describe("icons", function() {
        it("should get the passed icon", function() {
            var proj = {last_build_status: 0};

            expect(projectController.getIcon(proj)).toBe('imgs/icon-passed.png');
        });

        it("should get the failed icon", function() {
            var proj = {last_build_status: 1};

            expect(projectController.getIcon(proj)).toBe('imgs/icon-failed.png');
        });

        it("should get the started icon", function() {
            var proj = {last_build_status: null};

            expect(projectController.getIcon(proj)).toBe('imgs/icon-started.png');
        });
    });

    describe("name", function() {
        it("should extract the name of the project", function() {
            var name = projectController.getName({slug: 'user/project'});

            expect(name).toBe('project');
        });
    });

    describe("clear", function() {
        beforeEach(function() {
            chrome = { browserAction: {} };
            chrome.browserAction.setBadgeText = function () {};
        });
        
        it("should clear the html", function() {
            var obj = {};

            spyOn(projectController, 'el').andReturn(obj);

            projectController.clear();

            expect(obj.innerHTML).toMatch(/id="no-projects"/);
        });

        it("should remove badge", function() {
            spyOn(chrome.browserAction, 'setBadgeText'); 
            spyOn(projectController, 'el').andReturn({});

            projectController.clear();

            expect(chrome.browserAction.setBadgeText).toHaveBeenCalled();
            expect(chrome.browserAction.setBadgeText.calls[0].args[0]).toBeJson({text: ''});
        });
    });
});

