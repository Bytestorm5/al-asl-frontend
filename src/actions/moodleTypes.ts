/**
 * Represents a single course format option.
 */
export interface CourseFormatOption {
    /** Course format option name */
    name: string;
    /** Course format option value */
    value: string;
  }
  
  /**
   * Represents a single custom field for a course.
   */
  export interface CustomField {
    /** The name of the custom field */
    name: string;
    /** The shortname of the custom field */
    shortname: string;
    /** The type of the custom field (e.g., text, checkbox, etc.) */
    type: string;
    /** The raw value of the custom field */
    valueraw: string;
    /** The displayed/processed value of the custom field */
    value: string;
  }
  
  /**
   * Represents a single course.
   */
  export interface Course {
    /** Course ID */
    id: number;
    /** Course short name */
    shortname: string;
    /** Category ID */
    categoryid: number;
    /** (Optional) Sort order within the category */
    categorysortorder?: number;
    /** Full name of the course */
    fullname: string;
    /** Display name of the course */
    displayname: string;
    /** (Optional) Course ID number */
    idnumber?: string;
    /** Course summary */
    summary: string;
    /** Summary format (1 = HTML, 0 = MOODLE, 2 = PLAIN, 4 = MARKDOWN) */
    summaryformat: number;
    /** Course format (e.g., weeks, topics, social, site, etc.) */
    format: string;
    /** (Optional) 1 if grades are shown, otherwise 0 */
    showgrades?: number;
    /** (Optional) Number of recent news items on the course page */
    newsitems?: number;
    /** Timestamp (in seconds) for the course start date */
    startdate: number;
    /** Timestamp (in seconds) for the course end date */
    enddate: number;
    /** (Optional) (deprecated, use courseformatoptions) number of weeks/topics */
    numsections?: number;
    /** (Optional) Largest file size (in bytes) that can be uploaded */
    maxbytes?: number;
    /** (Optional) 1 if activity reports are shown, 0 otherwise */
    showreports?: number;
    /** (Optional) 1 if the course is visible to students, 0 otherwise */
    visible?: number;
    /** (Optional) (deprecated, use courseformatoptions) how hidden sections are displayed to students */
    hiddensections?: number;
    /** (Optional) Group mode: 0 = no group, 1 = separate, 2 = visible */
    groupmode?: number;
    /** (Optional) 1 if group mode is forced, 0 otherwise */
    groupmodeforce?: number;
    /** (Optional) Default grouping ID */
    defaultgroupingid?: number;
    /** (Optional) Timestamp when the course was created */
    timecreated?: number;
    /** (Optional) Timestamp when the course was modified */
    timemodified?: number;
    /** (Optional) 1 if completion is enabled, 0 if disabled */
    enablecompletion?: number;
    /** (Optional) 1 if completion notifications are enabled, 0 otherwise */
    completionnotify?: number;
    /** (Optional) Forced course language */
    lang?: string;
    /** (Optional) Name of the forced theme */
    forcetheme?: string;
    /** (Optional) Additional format options for the course */
    courseformatoptions?: CourseFormatOption[];
    /** Whether activity dates are shown (1) or not (0) */
    showactivitydates: number;
    /** Whether activity completion conditions are shown (1) or not (0) */
    showcompletionconditions: number;
    /** (Optional) Custom fields for the course */
    customfields?: CustomField[];
  }
  
  /**
   * Represents the overall structure: a list of Course objects.
   */
  export type CourseList = Course[];

  /**
 * Represents a file associated with a blog post (e.g., summary file or attachment).
 */
export interface BlogPostFile {
    /** File name (optional) */
    filename?: string;
    /** File path (optional) */
    filepath?: string;
    /** File size in bytes (optional) */
    filesize?: number;
    /** Download URL for the file (optional) */
    fileurl?: string;
    /** Last time modified (optional) */
    timemodified?: number;
    /** MIME type of the file (optional) */
    mimetype?: string;
    /** Indicates if the file is external (optional) */
    isexternalfile?: number;
    /** The repository type for external files (optional) */
    repositorytype?: string;
    /** Relative path to an icon that represents the file type (optional) */
    icon?: string;
  }
  
  /**
   * Represents a tag assigned to a blog entry.
   */
  export interface BlogEntryTag {
    /** Tag id */
    id: number;
    /** Tag name */
    name: string;
    /** The raw, unnormalized name for the tag as entered by users */
    rawname: string;
    /** Whether this tag is standard (1 = standard, 0 = not standard) */
    isstandard: number;
    /** Tag collection id */
    tagcollid: number;
    /** Tag instance id */
    taginstanceid: number;
    /** Context the tag instance belongs to */
    taginstancecontextid: number;
    /** Id of the record tagged */
    itemid: number;
    /** Tag ordering */
    ordering: number;
    /** Whether the tag is flagged as inappropriate (1 = flagged, 0 = not flagged) */
    flag: number;
    /** URL to view the tag (optional) */
    viewurl?: string;
  }
  
  /**
   * Represents a single blog entry/post.
   */
  export interface BlogEntry {
    /** Post/entry id */
    id: number;
    /** Module where the post was published (e.g., "blog", "blog_external", etc.) */
    module: string;
    /** Post author (user id) */
    userid: number;
    /** Course where the post was created */
    courseid: number;
    /** Group the post was created for */
    groupid: number;
    /** Module id where the post was created (not used anymore) */
    moduleid: number;
    /** Course module id where the post was created */
    coursemoduleid: number;
    /** Post subject */
    subject: string;
    /** Post summary */
    summary: string;
    /**
     * Post summary format (1 = HTML, 0 = MOODLE, 2 = PLAIN, 4 = MARKDOWN).
     * Defaults to 0 if not specified.
     */
    summaryformat: number;
    /** Post content */
    content: string;
    /** Unique hash of the post */
    uniquehash: string;
    /** Post rating */
    rating: number;
    /** Post content format (1 = HTML, 0 = MOODLE, 2 = PLAIN, 4 = MARKDOWN, etc.) */
    format: number;
    /** Post attachment reference (e.g., file name) */
    attachment: string;
    /** Publish state of the post */
    publishstate: string;
    /** Timestamp of when the post was last modified */
    lastmodified: number;
    /** Timestamp of when the post was created */
    created: number;
    /** User who last updated the post */
    usermodified: number;
    /** Files linked to the post summary */
    summaryfiles: BlogPostFile[];
    /** Files attached to the post (optional) */
    attachmentfiles?: BlogPostFile[];
    /** Tags for the post (optional) */
    tags?: BlogEntryTag[];
    /** Indicates if the user can edit the post (optional) */
    canedit?: number;
  }
  
  /**
   * Represents a single warning.
   */
  export interface BlogWarning {
    /** The item that produced the warning (optional) */
    item?: string;
    /** The item id associated with the warning (optional) */
    itemid?: number;
    /** A code used by the client app to implement specific behavior */
    warningcode: string;
    /** An untranslated English message explaining the warning */
    message: string;
  }
  
  /**
   * Represents the overall structure containing blog entries, total count, and any warnings.
   */
  export interface BlogEntriesResponse {
    /** List of blog entries/posts */
    entries: BlogEntry[];
    /** Total number of entries found */
    totalentries: number;
    /**
     * List of warnings (optional).
     * Each warning provides details about a specific issue.
     */
    warnings?: BlogWarning[];
  }
  
  /**
 * Represents a single criterion used to filter categories.
 */
export interface CategoryCriterion {
  /** The category column to search */
  key: 'id' | 'ids' | 'name' | 'parent' | 'idnumber' | 'visible' | 'theme';
  /** The value to match */
  value: string;
}

/**
 * Represents a single category with detailed information.
 */
export interface CourseCategory {
  /** Category ID */
  id: number;
  /** Category name */
  name: string;
  /** (Optional) Category ID number */
  idnumber?: string;
  /** Category description */
  description: string;
  /** Description format (1 = HTML, 0 = MOODLE, 2 = PLAIN, 4 = MARKDOWN) */
  descriptionformat: number;
  /** Parent category ID */
  parent: number;
  /** Category sorting order */
  sortorder: number;
  /** Number of courses in this category */
  coursecount: number;
  /** (Optional) 1: available, 0: not available */
  visible?: number;
  /** (Optional) 1: available, 0: not available */
  visibleold?: number;
  /** (Optional) Timestamp when the category was last modified */
  timemodified?: number;
  /** Category depth */
  depth: number;
  /** Category path */
  path: string;
  /** (Optional) Category theme */
  theme?: string;
}

/**
 * Request structure for the core_course_get_categories endpoint.
 */
export interface GetCategoriesRequest {
  /** List of criteria for filtering categories */
  criteria?: CategoryCriterion[];
  /**
   * Return the subcategories information (1 - default) or
   * only the category info (0).
   */
  addsubcategories?: 0 | 1;
}

/**
 * Response structure for the core_course_get_categories endpoint.
 */
export interface GetCategoriesResponse {
  /** List of categories */
  categories: CourseCategory[];
}