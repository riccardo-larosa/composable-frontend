import {
  SchematicTestRunner,
  UnitTestTree,
} from "@angular-devkit/schematics/testing"

import { createSourceFile, ScriptTarget } from "typescript"

import { Schema as WorkspaceOptions } from "../workspace/schema"
import { Schema as ApplicationOptions } from "../application/schema"

describe("Home Schematic", () => {
  const schematicRunner = new SchematicTestRunner(
    "@schematics/angular",
    require.resolve("../collection.json")
  )

  const workspaceOptions: WorkspaceOptions = {
    name: "workspace",
    epccClientId: "123",
    epccClientSecret: "456",
    epccEndpointUrl: "euwest.api.elasticpath.com",
  }

  const applicationOptions: ApplicationOptions = {
    name: "foo",
  }

  const defaultOptions = {}

  let initTree: UnitTestTree
  beforeEach(async () => {
    /**
     * Home schematic depends on workspace and application schematics
     */
    const workspaceTree = await schematicRunner
      .runSchematicAsync("workspace", workspaceOptions)
      .toPromise()
    initTree = await schematicRunner
      .runSchematicAsync("application", applicationOptions, workspaceTree)
      .toPromise()
  })

  it("should create home page files of an application", async () => {
    const options = {
      ...defaultOptions,
    }
    const tree = await schematicRunner
      .runSchematicAsync("home", options, initTree)
      .toPromise()
    const files = tree.files

    expect(files).toIncludeAllPartialMembers(["/src/pages/index.tsx"])
  })

  xit("home schematic should include default components when now are specified", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("home", {
        ...defaultOptions,
      })
      .toPromise()

    const tsSrcFile = createSourceFile(
      "index.tsx",
      tree.readContent("/src/pages/index.tsx"),
      ScriptTarget.Latest
    )

    // @ts-ignore
    const identifiers = tsSrcFile.identifiers as Map<string, string>

    expect(identifiers.has("PromotionBanner")).toEqual(true)
    expect(identifiers.has("FeaturedProducts")).toEqual(true)
  })

  xit("home schematic should include only the specified components", async () => {
    const tree = await schematicRunner
      .runSchematicAsync("home", {
        ...defaultOptions,
        components: ["FeaturedProducts"],
      })
      .toPromise()

    const tsSrcFile = createSourceFile(
      "index.tsx",
      tree.readContent("/src/pages/index.tsx"),
      ScriptTarget.Latest
    )

    // @ts-ignore
    const identifiers = tsSrcFile.identifiers as Map<string, string>

    expect(identifiers.has("PromotionBanner")).toEqual(false)
    expect(identifiers.has("FeaturedProducts")).toEqual(true)
  })
})
