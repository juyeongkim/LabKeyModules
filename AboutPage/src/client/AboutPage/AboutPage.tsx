import * as React from 'react';
import 'regenerator-runtime/runtime';

// Styling imports
import './AboutPage.scss';

const AboutPage: React.FC = () => {

    const [divToShow, setDivToShow] = React.useState<string>("About");
    const [subMenuToShow, setSubMenuToShow] = React.useState<string>("gene-expression")

    const [dataReleasesResults, setDataReleasesResults] = React.useState<string>("Loading Data Releases")

    async function fetchData(){
        let mappedData;

        LABKEY.Query.selectRows({
            schemaName: "lists",
            queryName: "Data Updates",
            columns: ['version', 'date', 'affected_studies', 'description'],
            success: function(data){
                mappedData = 
                    data.rows.map(function(arr, index){
                        return(
                            <tr key={index} data-item={arr}>
                                <td data-title="Version" style={{textAlign: "center", border: "1px solid black"}}>{arr.version}</td>
                                <td data-title="Date" style={{textAlign: "center", border: "1px solid black"}}>{arr.date.slice(0,10)}</td>
                                <td data-title="Affected Studies" style={{border: "1px solid black"}}>{arr.affected_studies}</td>
                                <td data-title="Description" style={{border: "1px solid black"}}>{arr.description}</td>
                            </tr>
                        )
                    })
                setDataReleasesResults(mappedData)
            }
        })
    }

    const [rSessionResults, setRSessionResults] = React.useState<string>("Loading R Session Info ...")

    var cnfReport = {
        failure: function(){
            setRSessionResults("Unknown Error within R Session Info Report")
        },
        reportId: 'module:RSessionInfo/RSessionInfo.Rmd',
        success: function(result){
            var errors = result.errors;
            var outputParams = result.outputParams;
            if ( errors && errors.length > 0 ){
                setRSessionResults("Error in retrieving R Session Info")
            } else if ( outputParams && outputParams.length > 0 ){
                var p = outputParams[0];
                setRSessionResults(p.value)
            } else{
                setRSessionResults('Strange situation: there are no reported errors, but also no output to show')
            }
        }
    };
    
    React.useEffect(() => {
        fetchData()
        LABKEY.Report.execute(cnfReport);
    }, [])

    // --------- ABOUT -----------------
    const About: React.FC = () => { 
        return(
            <div id="About">
                <p>
                    ImmuneSpace blossomed from a shared idea that generating large 
                    amounts collaborative data, cross-center and cross-assay, 
                    to characterize the status of the immune system in diverse 
                    populations under normal conditions and in response to various 
                    stimuli would be a beneficial platform. The Human Immunology 
                    Project Consortium (
                    <a href="https://www.immuneprofiling.org/hipc/page/show?pg=home" target="_blank">HIPC</a>
                    ) program, an organization founded by the 
                    <a href="https://www.niaid.nih.gov/about/dait" target="_blank"> NIAID-DAIT</a>
                    , released ImmuneSpace in January 15, 2016. 
                </p>
                <p>
                    Since its release, ImmuneSpace has developed into powerful 
                    data management and analysis engine, where datasets can be 
                    easily explored and analyzed using state-of-the-art 
                    computational tools. ImmuneSpace takes advantage of the 
                    considerable infrastructure already developed through 
                    another HIPC platform, 
                    <a href="https://immport.niaid.nih.gov" target="_blank"> ImmPort</a>
                    , which serves as a repository 
                    of data generated by investigators funded by DAIT. Data are 
                    submitted by each HIPC center to ImmPort using a set of 
                    standardized data templates. Once ImmPort has made these data 
                    public through routine data releases, the data are transferred 
                    to ImmuneSpace where integrative modeling across various data 
                    types and HIPC centers are enabled.
                </p>
                <p>
                    ImmuneSpace provides multiple ways to interact with, visualize, 
                    and analyze data. Each study contains tabs to view raw data, 
                    run common analyses, and look at custom reports. All the 
                    analyses make use of the R statistical language, leveraging 
                    <a href="http://rforge.net/Rserve/" target="_blank"> Rserve </a> 
                    to improve performance and 
                    <a href="http://yihui.name/knitr/" target="_blank"> knitr </a>
                    to enable full reproducibility. 
                </p>
                <img src="/AboutPage/images/dataflow.jpeg"
                    padding-top="80%"
                    width="40%"
                    style={{alignSelf: 'center'}}
                    />
                <p></p>
                <p><b>Support:</b></p>
                <ul>
                    <li>Slack: The best way to connect with the ImmuneSpace team is via the ImmuneSpace <a href="https://immunespace.herokuapp.com/">slack workspace</a></li>
                    <li>Email: You can also reach the team at <b>immunespace@gmail.com</b></li>
                </ul>
            </div>
        )
    }

    const DataStandards: React.FC = () => { 
        return(
            <div id="DataStandards">
                    <p>The HIPC data standards working group defines the metadata, assay results and controlled vocabularies used by HIPC centers to submit experimental results to NIAID/ImmPort. Most of the standards we develop are incorporated into the ImmPort data deposition templates. All HIPC centers submit data directly to ImmPort using the templates available on the <a href="http://www.immport.org/immport-open/public/home/dataTemplates">ImmPort Website</a>.</p>   
                    <p>HIPC specifies content for some experiment types. This includes:</p> 
                    <ul>
                        <li><strong>Transcriptional Profiling Experiments (e.g. microarray and RNA-seq)</strong>
                            <br></br>In addition to the experimental metadata submission to ImmPort, HIPC requires submission of the underlying data to NCBI. 
                            For details, please see <a href="http://www.immport.org/images/home/HIPC.Transcriptional_Profiling_Data_Standards.txt">HIPC Standards Working Group Transcription Profiling standards</a>.
                        </li>
                        <br></br>
                        <li><strong>Cell Cytometry Experiments</strong><br></br>
                            HIPC defines the standard for specifying cell population definitions and names. For details, please see <a href="https://www.immport.org/docs/standards/Cytometry_Data_Standard.pdf">HIPC Standards Working Group Cell Population Specification</a>.
                            In addition to raw data in .fcs files, HIPC requires the submission of derived data (e.g., the cell population frequencies). For CyTOF and flow cytometry, these are submitted using the associated derived data templates available on the <a href="http://www.immport.org/immport-open/public/home/dataTemplates">ImmPort Website</a>.
                        </li>
                        <br></br>
                        <li><strong>Multiplex Bead Array Assays (MBAA) Experiments (e.g. Luminex)</strong><br></br>
                            In addition to results from the assayed biological samples (experimental samples), HIPC requires submission of the results from the control samples and their standard curves. These are submitted using the control sample and standard curve templates available on the <a href="http://www.immport.org/immport-open/public/home/dataTemplates">ImmPort Website</a>.
                        </li>
                        <br></br>
                        <li><strong>Hemagglutination Inhibition Assay (HAI) experiments</strong><br></br>
                            The virus strain names are validated using NCBI Taxon with links to Taxon IDs. HAI data are submitted using HAI results templates available on the <a href="http://www.immport.org/immport-open/public/home/dataTemplates">ImmPort Website</a>.
                        </li>
                        <br></br>
                        <li><strong>Immune Exposure</strong><br></br>
                            HIPC specifies a structured format (immune exposure model) to characterize human immune responses/mechanisms elicited by vaccinations, adjuvants or natural infection. In addition, an immune exposure validator has been developed. The immune exposure metadata are entered using the human subject template available on the <a href="http://www.immport.org/immport-open/public/home/dataTemplates">ImmPort Website</a>.
                        </li>
                        <br></br>
                        <li><strong>Human Subject</strong><br></br>
                            As part of the entry of the human subject’s demographic information, HIPC uses the Gazetteer ontology to standardize the country location with a link to the Gazetteer ID. For the United States, the location field also includes the name of the state. Location information is entered using the human subject template available on the <a href="http://www.immport.org/immport-open/public/home/dataTemplates">ImmPort Website</a>.
                        </li>
                        <br></br>
                    </ul>

                    <p><strong>Publications</strong></p>
                    <ul>
                        <li>
                            <p>The following paper describes how to report and connect cell type names and gating definitions through ontologies including the Cell Ontology and Protein Ontology:</p>
                            <p><a href="https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-019-2725-5">James A. Overton JA, Vita R, Dunn P, Burel JG, Bukhari SAC, Cheung KH, Kleinstein SH, Diehl AD, Peters B. (2019) Reporting and connecting cell type names and gating definitions through ontologies. BMC Bioinformatics 20: 182</a>.</p>
                        </li>
                        <li>
                            <p>The following papers describe the development and use of a structured/ontological model to represent and validate human immune exposures elicited by vaccinations, adjuvants or natural infection:</p>
                            <p><a href="https://academic.oup.com/database/article/doi/10.1093/database/baaa016/5818925">Vita R, Overton JA, Dunn P, Cheung KH, Kleinstein SH, Sette A, Bjoern Peters B. (2019) A structured model for immune exposures. Database 2020:baaa016</a>.</p>
                            <p><a href="http://ceur-ws.org/Vol-2285/ICBO_2018_paper_41.pdf">Vita R, Overton JA, Cheung KH, Kleinstein SH, Peter B. Proceedings of the 9th International Conference on Biological Ontology (ICBO 2018), Corvallis, Oregon, USA</a>.</p>
                            <p><a href="https://www.jimmunol.org/content/202/1_Supplement/130.26">Vita RJ, Overton JA, Cheung KH, Dunn P, Burel J, Bukhari SAC, Diehl AD, Kleinstein SH, Sette A, Peters B. (2019) Formal representation of immunology related data with ontologies. J Immunol May 1, 2019, 202 (1 Supplement) 130.26</a>.</p>
                        </li>
                    </ul>
                                                                                                                          
                    <p><strong>Questions?</strong></p>
                    <p>For questions about ImmPort data depositions, email: <a href="mailto:bisc_helpdesk@niaid.nih.gov">bisc_helpdesk@niaid.nih.gov</a></p>
                    <p>For questions about HIPC data standards, email: <a href="mailto:hipc-standards@googlegroups.com">hipc-standards@googlegroups.com</a></p>
                    <p>More information about HIPC can be found at <a href="https://www.immuneprofiling.org/hipc/page/show">immuneprofiling.org</a></p>
            </div>
        )
    }

    // --------- DataProcessing-------------
    const DataProcessing: React.FC = () => { 

        const Cytometry: React.FC = () => {
            return(
                <div>
                    <p>
                        Under Construction
                    </p>
                </div>
            )
        }

        const GeneExpression: React.FC = () => {
            return(
                <div>
                   <img src="/AboutPage/images/ge_standardization.png"
                        padding-top="80%"
                        width="65%"/>
                </div>
            )
        }

        const ImmuneResponse: React.FC = () => {
            return(
                <div>
                    <p>
                        Under Construction
                    </p>
                </div>
            )
        }

        return(
            <div id="DataProcessing">
                { subMenuToShow == "cytometry" ? <Cytometry/> : null}
                { subMenuToShow == "gene-expression" ? <GeneExpression/> : null}
                { subMenuToShow == "immune-response" ? <ImmuneResponse/> : null}
            </div>
        )
    }

    const DataReleases: React.FC = () => { 
        const baseUrl = LABKEY.ActionURL['getBaseURL']()
        const softwareUpdatesLink = baseUrl + "project/Studies/begin.view?pageId=About#SoftwareUpdates"
        function handleSoftwareUpdateClick(){
            setDivToShow("SoftwareUpdates")
        }

        return(
            <div id="DataReleases" style={{padding: "15px"}}>
                <table style={{width: "100%", border: "1px solid black"}}>
                    <thead>
                        <tr>
                            <th style={{width: "15%", border: "1px solid black", textAlign: "center", fontWeight: "bold"}}>Version</th>
                            <th style={{width: "15%", border: "1px solid black", textAlign: "center", fontWeight: "bold"}}>Date</th>
                            <th style={{width: "30%", border: "1px solid black", textAlign: "center", fontWeight: "bold"}}>Affected Studies</th>
                            <th style={{width: "40%", border: "1px solid black", textAlign: "center", fontWeight: "bold"}}>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataReleasesResults}
                    </tbody>
                </table>
                <br></br>
                <p>Version numbers use the following scheme <b>x.y.z</b> where</p>
                <ul>
                    <li><b>x</b> is the version of ImmPort. The data is curated by ImmPort and ImmuneSpace gets updated after each offcial data release.</li>
                    <li><b>y</b> indicates a major data change. This includes loading new studies, adding datasets to existing studies or processing data such as creating gene expression matrices</li>
                    <li><b>z</b> indicates minor changes, such as reloading studies with minor corrections to existing assay or metadata</li>
                </ul>
                <p>Note that this only for <b>data</b>, the development of new features or updates to software infrastructure are tracked separately in <a href={softwareUpdatesLink} onClick={handleSoftwareUpdateClick}>Software Updates</a></p>
            </div>
        )  
    }

    const SoftwareUpdates: React.FC = () => { 

        return(
            <div id="SoftwareUpdates">
                <p><b>26 Dec 2019</b></p>
                <ul>
                    <li>Upgraded to <a href="https://www.labkey.org/wiki/Documentation/Archive/19.2/page.view?name=releasenotes192">LabKey 19.2</a></li>
                    <li>Upgrade to ImmuneSpaceR version 1.13.2</li>
                </ul>
                <p>&nbsp;</p>
                <p><b>21 May 2019</b></p>
                <ul>
                    <li>Upgraded R to 3.6.0</li>
                </ul>
                <p>&nbsp;</p>
                <p><b>20 May 2019</b></p>
                <ul>
                    <li>Upgraded to latest <a href="https://www.labkey.org/Documentation/wiki-page.view?name=whatsnew191">19.1 version</a> of LabKey.</li>
                    <li>Upgraded Java to openJDK-12</li>
                    <li>Upgraded Tomcat to Tomcat 9.0.17</li>
                    <li>Upgraded Commons Daemon to 1.1.0</li>
                </ul>
                <p>&nbsp;</p>
                <p><b>4 March 2019</b></p>
                <ul>
                    <li>Upgraded R to 3.5.2</li>
                </ul>
                <p>&nbsp;</p>
                <p><b>27 February 2019</b></p>
                <ul>
                    <li>Upgraded to latest <a href="https://www.labkey.org/Documentation/wiki-page.view?name=whatsnew183">18.3 version</a> of LabKey.</li>
                    <li>Upgraded the Dimension Reduction module to support quick PCA or tSNE analysis of a single study or multiple studies' assay data</li>
                    <li>Upgraded to <a href="https://github.com/RGLab/ImmuneSpaceR">ImmuneSpaceR</a> version 1.11.2</li>
                    <li>
                        <ul>
                            <li>Includes a handy "interactive_netrc()" function to help new users set up their netrc permissions file correctly</li>
                            <li>Added Immune Exposure information to the expressionSet output of con$getGEMatrix() to help users understand vaccine types and methods used</li>
                        </ul>
                    </li>
                </ul>
                <p>&nbsp;</p>
                <p><b>15 August 2018</b></p>
                <ul>
                    <li>Upgraded to latest <a href="https://www.labkey.org/Documentation/wiki-page.view?name=whatsnew182">18.2 version</a> of LabKey.</li>
                    <li>Upgraded to <a href="https://github.com/RGLab/ImmuneSpaceR">ImmuneSpaceR</a> version 1.7.4</li>
                </ul>
                <p>&nbsp;</p>
                <p><b>4 May 2018</b></p>
                <ul>
                    <li>Upgraded to latest <a href="https://www.labkey.org/Documentation/wiki-page.view?name=whatsnew181">18.1 version</a> of LabKey (e.g. sharing of reports as well as editing them via the integrated RStudio Server is now available).</li>
                    <li>Upgraded to <a href="https://github.com/RGLab/ImmuneSpaceR">ImmuneSpaceR</a> version 1.7.3:</li>
                    <li>
                        <ul>
                            <li>it now utilizes the new R6 class system</li>
                            <li>new cleaner documentation is available <a href="http://rglab.org/ImmuneSpaceR/index.html">here</a></li>
                            <li>raw gene expression matrices can now also be pulled via&nbsp;<a href="http://rglab.org/ImmuneSpaceR/reference/ImmuneSpaceConnection.html#methods">getGEMatrix()</a></li>
                        </ul>
                    </li>
                </ul>
                <p>&nbsp;</p>
                <p><b>6 February 2018</b></p>
                <ul>
                    <li>Upgraded to latest 17.3 version of LabKey.</li>
                    <li>Upgraded R to 3.4.3</li>
                </ul>
                <p>&nbsp;</p>
                <p><b>27 November 2017</b></p>
                <ul>
                    <li>Upgraded to latest 17.2 version of LabKey.</li>
                    <li>Upgraded custom modules, including error handling in HIPCMatrix for CreateMatrix functionality.</li>
                    <li>Upgraded to ImmuneSpaceR version 1.7.0 that utilizes a dynamic Gene Expression query.</li>
                </ul>
                <p>&nbsp;</p>
                <p><b>24 August 2017</b></p>
                <ul>
                    <li>Upgrade to LabKey 17.2.</li>
                    <li>Added functionality to automatically update and standardize the gene symbols used on the portal.</li>
                </ul>
                <p>&nbsp;</p>
                <p><b>16 June 2017</b></p>
                <ul>
                    <li>Upgrade to R 3.4.0.</li>
                    <li>Enabled interactive visualizations for all reports and modules.</li>
                    <li>Added to the Data Finder an ability to filter individual studies.</li>
                </ul>
                <p>&nbsp;</p>
                <p><b>24 March 2017</b></p>
                <ul>
                    <li>Upgrade to LabKey 17.1.</li>
                    <li>Added the ability to launch an integrated <a title="RStudio Server" href="https://www.rstudio.com/products/rstudio-server/">RStudio Server</a> instance.</li>
                </ul>
                <p>&nbsp;</p>
                <p><b>13 December 2016</b></p>
                <ul>
                    <li>Upgrade to R 3.3.1.</li>
                    <li>Upgrade to LabKey 16.3.</li>
                </ul>
                <p>&nbsp;</p>
                <p><b>21 July 2016</b></p>
                <ul>
                    <li>Upgrade to LabKey 16.2.</li>
                    <li>Enabled markdown v2 for all reports and modules.</li>
                </ul>
                <p>&nbsp;</p>
                <p><b>3 May 2016</b></p>
                <ul>
                    <li>A new export interface as been added to the <a href="https://www.immunespace.org/project/Studies/begin.view?">Data Finder</a> to download selected files and tables as. Click the <strong>Export study datasets</strong> button to access it.</li>
                    <li>Upgrade to R 3.2.4.</li>
                    <li>Upgrade to LabKey 16.1.</li>
                </ul>
                <p>&nbsp;</p>
                <p><b>22 October 2015</b></p>
                <ul>
                    <li>A new <a href="https://www.immunespace.org/project/Studies/begin.view?">Data Finder</a> replaces the study finder.</li>
                    <li>Upgrade to LabKey 15.3.</li>
                    <li>The <a href="https://www.immunespace.org/DataExplorer/Studies/begin.view">Data Explorer</a> can now be used to plot data across studies.</li>
                </ul>
                <p>&nbsp;</p>
                <p><b>22 July 2015</b></p>
                <ul>
                    <li>Upgrade to LabKey 15.2.</li>
                    <li>New tours have been added to all the modules. Click the "QUICK HELP" button in any module to start the demo.</li>
                    <li>Improved study finder UI.</li>
                </ul>
            </div>
        )
    }

    const RSessionInfo: React.FC = () => { 
        const divRef = React.useRef(null)

        // To minimize calls to the LABKEY.report() to init, must ensure that <scripts> associated with the report
        // are loaded when html is inserted.  `dangerouslySetHtml` doesn't do this, so must append html as new node.
        // When appending the child node, there is no way to determine when the script has loaded as the append does not
        // have a callback fn.  So using setTimeout to ensure htmlwidgets.js is actually ready (comes from streamfile)
        React.useEffect(() => {
            const slotHtml = document.createRange().createContextualFragment(rSessionResults) // Create a 'tiny' document and parse the html string
            divRef.current.innerHTML = '' // Clear the container
            divRef.current.appendChild(slotHtml) // Append the new content
            var el = document.querySelector('.labkey-knitr')
            if(el){
                setTimeout( function(){
                    window['HTMLWidgets'].staticRender()  
                }, 1000)
            } 
        }, [rSessionResults])

        return (
            <div ref={divRef}>Loading R Session Info</div>
        )
    }

    // --------- NAVBAR -----------------
    // Use bootstrap in Navbar
    const Navbar: React.FC = () => { 
        
        const divInfo = [
            {
                id: "about",
                tag: "About",
                text: "About"
            },
            {
                id: "data-standards",
                tag: "DataStandards",
                text: "Data Standards"
            },
            {
                id: "data-processing",
                tag: "DataProcessing",
                text: "Data Processing",
                subMenu: [
                    {
                        tag: "cytometry",
                        text: "Cytometry"
                    },
                    {
                        tag: "gene-expression",
                        text: "Gene Expression"
                    },
                    {
                        tag: "immune-response",
                        text: "Immune Response"
                    }
                ]
            },
            {
                id: "data-release",
                tag: "DataReleases",
                text: "Data Releases"
            },
            {
                id: "software-updates",
                tag: "SoftwareUpdates",
                text: "Software Updates"
            },
            {
                id: "r-session-info",
                tag: "RSessionInfo",
                text: "R Session Info"
            },
        ]

       
        const navBarElements = divInfo.map(function(el){
            const itemId = "navbar-link-" + el.id;
            const href = "#" + el.tag;
    
            if(["DataProcessing"].indexOf(el.tag) !== -1){
                var className = "nav-item dropdown" + (divToShow == el.tag ? " active" : "");
                const dropDownId = el.tag + "Dropdown"

                const subMenuHtml = el.subMenu.map(function(subel, i){
                    const tag = "#" + subel.tag
                    return(
                        <li>
                            <a  key={i} 
                                id={subel.tag} 
                                href={tag} 
                                onClick={function(){
                                    setDivToShow(el.tag)
                                    setSubMenuToShow(subel.tag)
                                }}>
                                {subel.text}
                            </a>
                        </li>
                    )
                })

                return(
                    <li id={itemId} className={className}>
                        <a  className="dropdown-toggle" 
                            href={href} 
                            id={dropDownId} 
                            role="button" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false"
                            onClick={function(){
                                const parentNode = document.getElementById(itemId)
                                if(parentNode.className == "nav-item dropdown active"){
                                    parentNode.className = "nav-item dropdown active open"
                                }else if(parentNode.className == "nav-item dropdown active open"){
                                    parentNode.className = "nav-item dropdown active"
                                }
                            }}>
                            {el.text} <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu">
                            {subMenuHtml}
                        </ul>
                        
                    </li>
                )
            }else{
                const className = divToShow == el.tag ? " active" : "";
                function handleNavBarClick(){
                    setDivToShow(el.tag)
                }

                return(
                    <li id = {itemId} className = {className}>
                        <a href = {href} onClick={handleNavBarClick}>
                            {el.text}
                        </a>
                    </li>
                )
            }
        })

        return(
            <nav className="navbar navbar-default" style={{backgroundColor: 'white'}} >
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        {navBarElements}
                    </ul>
                </div>
            </nav>
        )
    }

    const ComponentToShow: React.FC = () => {
        return(
            <div>
                { divToShow == "About" ? <About/> : null }
                { divToShow == "DataStandards" ? <DataStandards/> : null }
                { divToShow == "DataProcessing" ? <DataProcessing/> : null } 
                { divToShow == "DataReleases" ? <DataReleases/> : null }
                { divToShow == "SoftwareUpdates" ? <SoftwareUpdates/> : null }
                { divToShow == "RSessionInfo" ? <RSessionInfo/> : null }
            </div>
        )
    }

    // return
    return(
        <div>
            <Navbar/>
            <div style={{padding: "15px"}}>
                <ComponentToShow/>
            </div>
        </div>
    )
}

export const App: React.FC = () => {

    const filterBanner = document.getElementById('filter-banner')
    filterBanner.style.display = 'none'

    // Must return a React Fragment
    return <AboutPage/>
}